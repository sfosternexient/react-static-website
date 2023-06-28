# stage/frontend-app/main.tf
terraform {
      # This module is now only being tested with Terraform 0.13.x. However, to make upgrading easier, we are setting
  # 0.12.26 as the minimum version, as that version added support for required_providers with source URLs, making it
  # forwards compatible with 0.13.x code.
    required_version = ">= 0.12.26"

    resource "random_string" "string" {
        length  = var.length
        numeric = var.number
        special = var.special
    }

    backend "s3" {
        bucket         = "my-terraform-state"
        key            = "stage/frontend-app/terraform.tfstate"
        region         = "us-east-1"
        encrypt        = true
        dynamodb_table = "my-lock-table"
    }
}

output "hello_world" {
    value = "Hello, World!"
}

