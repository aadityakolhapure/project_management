create table public.labels (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  label text null,
  description text null,
  color text null,
  project_id uuid null default gen_random_uuid (),
  updated_at timestamp with time zone null,
  constraint labels_pkey primary key (id),
  constraint labels_project_id_fkey foreign KEY (project_id) references projects (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.priorities (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  label text null,
  description text null,
  color text null,
  project_id uuid null default gen_random_uuid (),
  updated_at timestamp with time zone null,
  "order" numeric null,
  constraint priorities_pkey primary key (id),
  constraint priorities_project_id_fkey foreign KEY (project_id) references projects (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.sizes (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  label text null,
  description text null,
  color text null,
  project_id uuid null default gen_random_uuid (),
  updated_at timestamp with time zone null,
  "order" numeric null,
  constraint sizes_pkey primary key (id),
  constraint sizes_project_id_fkey foreign KEY (project_id) references projects (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.statuses (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  label text null,
  description text null,
  color text null,
  project_id uuid null default gen_random_uuid (),
  updated_at timestamp with time zone null,
  "order" numeric null,
  "limit" numeric null,
  constraint statuses_pkey primary key (id),
  constraint statuses_project_id_fkey foreign KEY (project_id) references projects (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.tasks (
  created_at timestamp with time zone not null default now(),
  project_id uuid null,
  status_id uuid null,
  created_by uuid null,
  updated_at timestamp with time zone null,
  title text null,
  description text null,
  priority uuid null,
  size uuid null,
  "startDate" timestamp with time zone null,
  "endDate" timestamp with time zone null,
  id uuid not null default gen_random_uuid (),
  "statusPosition" numeric null,
  constraint tasks_pkey primary key (id),
  constraint tasks_id_key unique (id),
  constraint tasks_project_id_fkey foreign KEY (project_id) references projects (id) on delete CASCADE,
  constraint tasks_size_fkey foreign KEY (size) references sizes (id) on delete set null,
  constraint tasks_status_id_fkey foreign KEY (status_id) references statuses (id) on delete CASCADE,
  constraint tasks_priority_fkey foreign KEY (priority) references priorities (id) on delete set null,
  constraint tasks_created_by_fkey foreign KEY (created_by) references users (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.activities (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  task_id uuid null,
  user_id uuid null,
  content jsonb[] null,
  updated_at timestamp with time zone null,
  constraint activities_pkey primary key (id),
  constraint activities_task_id_fkey foreign KEY (task_id) references tasks (id) on delete CASCADE,
  constraint activities_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.comments (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone null,
  task_id uuid null,
  user_id uuid null,
  content text null,
  constraint comments_pkey primary key (id),
  constraint comments_task_id_fkey foreign KEY (task_id) references tasks (id) on delete CASCADE,
  constraint comments_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.task_assignees (
  created_at timestamp with time zone not null default now(),
  task_id uuid null,
  id uuid not null default gen_random_uuid (),
  user_id uuid null,
  updated_at timestamp with time zone null,
  constraint task_assignees_pkey primary key (id),
  constraint task_assignees_id_key unique (id),
  constraint task_assignees_task_id_fkey foreign KEY (task_id) references tasks (id) on delete CASCADE,
  constraint task_assignees_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;

create table public.task_labels (
  created_at timestamp with time zone not null default now(),
  label_id uuid null,
  task_id uuid null,
  id uuid not null default gen_random_uuid (),
  updated_at timestamp with time zone null,
  constraint task_labels_pkey primary key (id),
  constraint task_labels_id_key unique (id),
  constraint task_labels_label_id_fkey foreign KEY (label_id) references labels (id) on delete CASCADE,
  constraint task_labels_task_id_fkey foreign KEY (task_id) references tasks (id) on delete CASCADE
) TABLESPACE pg_default;