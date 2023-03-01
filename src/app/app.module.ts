import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';

import { AppComponent } from './app.component';
import { ConfigService } from './config.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    OktaAuthModule
  ],
  providers: [
    ConfigService,
    // APP_INITIALIZER factory that returns a promise which resolves once the configuration is fetched.
    // This needs to run before any OktaAuth code because in our codebase
    // this is where we fetch the configuration of Okta from our API
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => {
        return async () => {
          console.log('APP_INITIALIZER');
          await configService.getConfig();
        }
      },
      multi: true,
      deps: [ConfigService],
    },
    // OKTA_CONFIG factory
    // This needs to run after the promise returned by APP_INITIALIZER has resolved.
    // Per the bug report, since the OktaAuthModule's constructor injects `OKTA_CONFIG`
    // this factory is actually run before the APP_INITIALIZER.
    {
      provide: OKTA_CONFIG,
      useFactory: (configService: ConfigService) => {
        console.log('OKTA_CONFIG factory');
        return configService.config;
      },
      deps: [ConfigService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
