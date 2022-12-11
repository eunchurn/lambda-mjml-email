data "archive_file" "function_archive" {
  type        = "zip"
  source_dir  = "${path.module}/../lambda/dist"
  output_path = "${path.module}/../lambda/dist/function.zip"
}

resource "aws_lambda_layer_version" "dependency_layer" {
  filename            = "${path.module}/../dist/layers/layers.zip"
  layer_name          = "${local.name}_dependency_layer"
  compatible_runtimes = ["nodejs16.x"]
  source_code_hash    = filebase64sha256("${path.module}/../dist/layers/layers.zip")
}

resource "aws_lambda_function" "lambda" {
  filename      = data.archive_file.function_archive.output_path
  function_name = local.name
  role          = aws_iam_role.lambda_exec.arn
  handler = "index.handler"
  layers  = [aws_lambda_layer_version.dependency_layer.arn]

  # Lambda Runtimes can be found here: https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html
  runtime     = "nodejs16.x"
  timeout     = "30"
  memory_size = local.lambda_memory

  source_code_hash = data.archive_file.function_archive.output_base64sha256
}
