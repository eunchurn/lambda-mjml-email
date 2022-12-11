locals {
  name          = "mjml-email"
  author        = "Eunchurn Park"
  email         = "eunchurn.park@gmail.com"
  lambda_memory = 128

  tags = {
    Name      = "Email Sender"
    GitRepo   = "https://github.com/eunchurn/lambda-mjml-email"
    ManagedBy = "Terraform"
    Owner     = "${local.email}"
  }
}
