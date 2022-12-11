data "aws_iam_policy_document" "lambda_assume_role_document" {
  version = "2012-10-17"

  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    effect = "Allow"
  }
}

data "aws_iam_policy_document" "lambda_document" {
  version = "2012-10-17"

  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "cloudwatch:PutMetricData",
      "ses:SendRawEmail",
      "kms:*",
    ]

    resources = ["*"]
  }
}


resource "aws_iam_role" "lambda_exec" {
  name = "${local.name}-lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
  tags = "${local.tags}"
}

resource "aws_iam_policy" "lambda_policy" {
  policy = "${data.aws_iam_policy_document.lambda_document.json}"
}

resource "aws_iam_policy_attachment" "lambda_attachment" {
  name = "${local.name}-attachment"

  roles = [
    "${aws_iam_role.lambda_exec.name}",
  ]

  policy_arn = "${aws_iam_policy.lambda_policy.arn}"
}
