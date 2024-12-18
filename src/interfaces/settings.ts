export interface settingsProp {
  language?: string | string[] | any;
  siteFavicon?: string;
  siteLogo?: string;
  siteName?: string;
  siteDescription?: string;
  cloudflarePublicKey?: string;
  cloudflareSecretKey?: string;
  advert?: { top: string; left: string; right: string; inner: string };
  email?: {
    host: string;
    email: string;
    password: string;
  };
  coin?: {
    login?: number;
    discussion?: number;
    comment?: number;
    bestAnswer?: number;
  };
  banWords?: string;
  status?: string;
  announcementText?: string;
  announcementLink?: string;
}
