# Angular × Supabase  Web Application

AngularとSupabase間はRxjsを使ってデータの受け渡しをする

# Setup
1. nodebrew を使用してnode.js のバージョン管理

```
nodebrew use 18.13.0
```

2. Angular アプリケーションの作成

```
ng new angular-supabase
```

3. supabase javascirpt をインストール

```
npm install @supabase/supabase-js
```

4. supabase service の作成と supabase client の初期化

```
ng generate service services/supabase
```

```
// supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  public client: SupabaseClient;

  constructor() {
    this.client = createClient(environment.supabaseUrl, environment.supabaseKey);
  }
}
```

supabase APi を使用するための API key と URL の登録

```
// environment.ts
export const environment = {
  production: false,
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseKey: 'YOUR_SUPABASE_KEY'
};
```

# Auth Service
1. auth service の作成

```
ng generate service services/auth
```

```
// auth.service.ts
import { Injectable } from '@angular/core';
import { RealtimeChannel, User } from '@supabase/supabase-js';
import { BehaviorSubject, first, Observable, skipWhile } from 'rxjs';
import { SupabaseService } from './supabase.service';

export interface Profile {
  user_id: string;
  photo_url: string;
  email: string;
  first_name: string;
  last_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Supabase user state
  private _$user = new BehaviorSubject<User | null | undefined>(undefined);
  $user = this._$user.pipe(skipWhile(_ => typeof _ === 'undefined')) as Observable<User | null>;
  private user_id?: string;

  // Profile state
  private _$profile = new BehaviorSubject<Profile | null | undefined>(undefined);
  $profile = this._$profile.pipe(skipWhile(_ => typeof _ === 'undefined')) as Observable<Profile | null>;
  private profile_subscription?: RealtimeChannel;

  constructor(private supabase: SupabaseService) { }
  
  constructor(private supabase: SupabaseService) { }

}
```



## 参考
[Supabase Angular authentication with RxJS Observables](https://gist.github.com/kylerummens/c2ec82e65d137f3220748ff0dee76c3f)

[supabase 公式 Doc](https://supabase.com/docs/guides/getting-started/tutorials/with-angular)