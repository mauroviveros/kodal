export interface IdentityData {
    readonly avatar_url:         string;
    readonly email:              string;
    readonly email_verified:     boolean;
    readonly full_name:          string;
    readonly iss:                string;
    readonly name:               string;
    readonly phone_verified:     boolean;
    readonly preferred_username: string;
    readonly provider_id:        string;
    readonly sub:                string;
    readonly user_name:          string;
}

export interface Pet {
  readonly id:          string;
  readonly name:        string;
  readonly breed:       string;
  readonly notes:       string;
  readonly gender:      string;
  readonly status:      string;
  readonly species:     string;
  readonly medal_id:    string;
  readonly birth_date:  Date;
  readonly created_at:  Date;
  readonly updated_at:  Date;
  readonly avatar_path: string;
}

export interface Medal {
  readonly id:              string;
  readonly code:            string;
  readonly status:          string;
  readonly manufactured_by: null;
  readonly manufactured_at: null;
  readonly updated_at:      Date;
  readonly created_at:      Date;
  readonly email:           null | string;
  readonly full_name:       null | string;
  readonly phone:           null | string;
  readonly address:         null;
  readonly relation_type:   null | string;
  readonly pet:             Pet | null;
}
