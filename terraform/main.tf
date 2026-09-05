terraform {
  required_version = ">= 1.5.0"

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 1.0"
    }
    supabase = {
      source  = "supabase/supabase"
      version = "~> 1.0"
    }
  }
}

variable "vercel_api_token" {
  type        = string
  description = "Vercel API Token"
  sensitive   = true
}

variable "vercel_team_id" {
  type        = string
  description = "Vercel Team ID (optional)"
  default     = ""
}

variable "supabase_access_token" {
  type        = string
  description = "Supabase Access Token"
  sensitive   = true
}

variable "supabase_organization_id" {
  type        = string
  description = "Supabase Organization ID"
}

variable "supabase_database_password" {
  type        = string
  description = "Database Password for Supabase"
  sensitive   = true
}

provider "vercel" {
  api_token = var.vercel_api_token
  team      = var.vercel_team_id != "" ? var.vercel_team_id : null
}

provider "supabase" {
  access_token = var.supabase_access_token
}

resource "vercel_project" "cultiso_frontend" {
  name      = "cultiso"
  framework = "nextjs"
}

resource "supabase_project" "cultiso_backend" {
  organization_id   = var.supabase_organization_id
  name              = "cultiso"
  database_password = var.supabase_database_password
  region            = "eu-west-1"
}
