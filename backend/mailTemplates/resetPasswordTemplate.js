const passwordResetEmail = (name, resetLink) => {
  return `<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Password Reset Request</title>
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

        .highlight {
            font-weight: bold;
            color: #c084fc;
        }

        a { color: #c084fc; text-decoration: underline; }
    </style>
</head>

<body>
    <div class="container">
        <div class="text-logo">Task Tracker</div>
        <div class="message">Reset Your Password</div>
        <div class="body">
            <p style="color:#fff;">Dear ${name},</p>
            <p style="color:#fff;">We received a request to reset your password. Click the button below to reset it:</p>
            <a class="cta" href="${resetLink}">Reset Password</a>
            <p style="color:#fff;">This link is valid for only 15 minutes. If you did not request this, please ignore this email or contact support.</p>
        </div>
        <div class="support">
            If you have any questions or need assistance, please reach out to us at
            <a href="mailto:support@tasktracker.com">support@tasktracker.com</a>. We are here to help!
        </div>
    </div>
</body>

</html>
`;
};

module.exports = passwordResetEmail;
