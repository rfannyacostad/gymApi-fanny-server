import { Injectable, OnModuleInit } from '@nestjs/common';
import { create, Client } from '@open-wa/wa-automate';

@Injectable()
export class WhatsappService implements OnModuleInit {
  public client: Client | null = null;

  async onModuleInit() {
    try {
      this.client = await create({
        sessionId: "DibekSession",
        multiDevice: true,
        authTimeout: 0,
        puppeteerOptions: {
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu",
            "--disable-features=site-per-process",
            "--disable-web-security",
            "--single-process",
          ],
        },
      });

      console.log("💚 WhatsApp Client READY");

    } catch (err) {
      console.error("❌ Error iniciando open-wa:", err);
      this.client = null;
    }
  }

  async sendMessage(to: string, message: string) {
    if (!this.client) {
      console.warn("⚠️ WhatsApp no está listo");
      return;
    }

    const clean = to.replace(/\D/g, "");
    const chatId = (clean.startsWith("521") ? clean : "521" + clean) + "@c.us";

    return this.client.sendText(chatId as any, message);
  }
}
