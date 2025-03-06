create table public.project_members (
  created_at timestamp with time zone not null default now(),
  project_id uuid null,
  user_id uuid null,
  role text null,
  "invitationStatus" text null,
  invited_at timestamp with time zone null,
  joined_at timestamp with time zone null,
  id uuid not null default gen_random_uuid (),
  updated_at timestamp with time zone null,
  constraint project_members_pkey primary key (id),
  constraint project_members_id_key unique (id),
  constraint project_members_project_id_fkey foreign KEY (project_id) references projects (id) on delete CASCADE,
  constraint project_members_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE,
  constraint project_members_user_id_fkey1 foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;