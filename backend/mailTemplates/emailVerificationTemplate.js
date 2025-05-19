const otpTemplate = (otp) => {
  return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Task Tracker - Email Verification</title>
		<style>
			body {
				background: linear-gradient(135deg, #1a1333 0%, #2d1a4d 100%);
				font-family: 'Segoe UI', Arial, sans-serif;
				font-size: 16px;
				color: #e0e7ef;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 420px;
				margin: 40px auto;
				background: #231942;
				border-radius: 18px;
				box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
				padding: 32px 24px 24px 24px;
				text-align: center;
				border: 1px solid #6d28d9;
			}
	
			.text-logo {
				font-size: 2.2rem;
				font-weight: 900;
				background: linear-gradient(90deg, #a78bfa 0%, #c084fc 100%);
				color: transparent;
				background-clip: text;
				-webkit-background-clip: text;
				margin-bottom: 18px;
				letter-spacing: 2px;
				font-family: 'Segoe UI', Arial, sans-serif;
			}
	
			.message {
				font-size: 22px;
				font-weight: 700;
				margin-bottom: 18px;
				color: #c084fc;
				letter-spacing: 1px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 18px;
				color: #fff;
			}
	
			.otp {
				display: inline-block;
				font-size: 2.2rem;
				font-weight: bold;
				background: linear-gradient(90deg, #a78bfa 0%, #c084fc 100%);
				color: #fff;
				padding: 10px 32px;
				border-radius: 10px;
				margin: 18px 0;
				letter-spacing: 8px;
				box-shadow: 0 2px 8px rgba(192,132,252,0.15);
			}
	
			.cta {
				display: inline-block;
				padding: 10px 24px;
				background: linear-gradient(90deg, #a78bfa 0%, #c084fc 100%);
				color: #fff;
				text-decoration: none;
				border-radius: 8px;
				font-size: 16px;
				font-weight: 600;
				margin-top: 18px;
				box-shadow: 0 2px 8px rgba(192,132,252,0.15);
			}
	
			.support {
				font-size: 14px;
				color: #bda4e6;
				margin-top: 24px;
			}
	
			a { color: #c084fc; text-decoration: underline; }
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<div class="text-logo">Task Tracker</div>
			<div class="message">Verify Your Email</div>
			<div class="body">
				<p style="color:#fff;">Hi there,</p>
				<p style="color:#fff;">Thank you for registering with <b>Task Tracker</b>! To complete your registration, please use the following OTP to verify your account:</p>
				<div class="otp">${otp}</div>
				<p style="color:#fff;">This OTP is valid for 5 minutes. If you did not request this verification, you can safely ignore this email.</p>
			</div>
			<div class="support">
				Need help? Contact us at <a href="mailto:support@tasktracker.com">support@tasktracker.com</a>.<br />
				&copy; ${new Date().getFullYear()} Task Tracker
			</div>
		</div>
	</body>
	
	</html>`;
};
module.exports = otpTemplate;
