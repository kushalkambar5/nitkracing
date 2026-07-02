import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import nodemailer from 'nodemailer'

function contactApiPlugin(env) {
  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/api/contact' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              const { name, email, subject, message } = data;

              if (!name || !email || !subject || !message) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing required fields' }));
                return;
              }

              const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: env.SMTP_USER,
                  pass: env.SMTP_PASS,
                },
              });

              const mailOptions = {
                from: `"${name}" <${env.SMTP_USER}>`,
                to: env.SMTP_RECEIVER,
                replyTo: email,
                subject: `Contact Form: ${subject}`,
                text: `You have received a new message from the contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
              };

              await transporter.sendMail(mailOptions);

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Email sent successfully!' }));
            } catch (error) {
              console.error('Error sending email locally:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), contactApiPlugin(env)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
})

