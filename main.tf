resource "random_string" "string" {
  length  = var.length
  numeric = var.number
  special = var.special
}