import { transporter } from "libs/transporter";
import { resetPasswordHtmlRender } from "libs/templates";

async function resetMain() {
  const html = await resetPasswordHtmlRender(
    "https://google.com/reset-password?token=1234",
    "",
  );

  transporter.sendMail({
    from: `"My Service" no-reply@myservice.com`,
    to: `"박은천" eunchurn.park@gmail.com`,
    subject: "[My Service] 비밀번호 재설정 등록 안내",
    html,
  });
}

resetMain();
