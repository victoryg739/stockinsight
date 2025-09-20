import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
// Alternative: import nodemailer from "nodemailer";

// Prevent caching for cron jobs
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to fetch current market price
async function fetchMarketPrice(symbol: string): Promise<number | null> {
  try {
    // Using the same logic as your existing fetchMarketPrice function
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`);

    if (!response.ok) {
      console.error(`Failed to fetch price for ${symbol}: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return data.c || null; // 'c' is the current price
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return null;
  }
}

// Function to send email notification
async function sendAlertEmail(userEmail: string, alert: any, currentPrice: number) {
  const conditionText = alert.condition === "ABOVE" ? "above" : "below";
  const priceDirection = alert.condition === "ABOVE" ? "📈" : "📉";

  try {
    await resend.emails.send({
      from: 'StockInsight Alerts <onboarding@resend.dev>', // Resend's testing domain
      // Alternative: Use your verified Gmail address
      // from: 'StockInsight Alerts <qwerty7391999@gmail.com>', // Your verified Gmail
      to: userEmail,
      subject: `🚨 Price Alert Triggered: ${alert.symbol}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">StockInsight Alert ${priceDirection}</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Your price alert has been triggered!</p>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
            <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 24px;">${alert.symbol}</h2>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
              <div>
                <p style="margin: 0; color: #64748b; font-size: 14px;">Current Price</p>
                <p style="margin: 5px 0 0 0; color: #1e293b; font-size: 20px; font-weight: bold;">$${currentPrice.toFixed(2)}</p>
              </div>
              <div>
                <p style="margin: 0; color: #64748b; font-size: 14px;">Target Price</p>
                <p style="margin: 5px 0 0 0; color: #1e293b; font-size: 20px; font-weight: bold;">$${alert.target_price}</p>
              </div>
            </div>
            
            <div style="background: ${alert.condition === "ABOVE" ? "#dcfce7" : "#fef2f2"}; padding: 15px; border-radius: 8px; border-left: 4px solid ${alert.condition === "ABOVE" ? "#16a34a" : "#dc2626"};">
              <p style="margin: 0; color: ${alert.condition === "ABOVE" ? "#166534" : "#991b1b"}; font-weight: 500;">
                Alert triggered: Price went ${conditionText} your target of $${alert.target_price}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-bottom: 25px;">
            <a href="${process.env.NEXTAUTH_URL}/alerts" 
               style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
              View All Alerts
            </a>
          </div>
          
          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
            <p style="margin: 0; color: #64748b; font-size: 12px;">
              This alert has been automatically deactivated. You can create a new alert in your dashboard.
            </p>
            <p style="margin: 10px 0 0 0; color: #64748b; font-size: 12px;">
              © ${new Date().getFullYear()} StockInsight. All rights reserved.
            </p>
          </div>
        </div>
      `,
    });

    console.log(`Alert email sent successfully to ${userEmail} for ${alert.symbol}`);
  } catch (error) {
    console.error(`Failed to send email to ${userEmail}:`, error);
  }
}

// Alternative Gmail SMTP function (uncomment to use)
/*
async function sendAlertEmailWithGmail(userEmail: string, alert: any, currentPrice: number) {
  const conditionText = alert.condition === "ABOVE" ? "above" : "below";
  const priceDirection = alert.condition === "ABOVE" ? "📈" : "📉";
  
  // Create Gmail transporter
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // qwerty7391999@gmail.com
      pass: process.env.GMAIL_APP_PASSWORD, // Your Gmail App Password
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 28px;">StockInsight Alert ${priceDirection}</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Your price alert has been triggered!</p>
      </div>
      
      <div style="background: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
        <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 24px;">${alert.symbol}</h2>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
          <div>
            <p style="margin: 0; color: #64748b; font-size: 14px;">Current Price</p>
            <p style="margin: 5px 0 0 0; color: #1e293b; font-size: 20px; font-weight: bold;">$${currentPrice.toFixed(2)}</p>
          </div>
          <div>
            <p style="margin: 0; color: #64748b; font-size: 14px;">Target Price</p>
            <p style="margin: 5px 0 0 0; color: #1e293b; font-size: 20px; font-weight: bold;">$${alert.target_price}</p>
          </div>
        </div>
        
        <div style="background: ${alert.condition === "ABOVE" ? "#dcfce7" : "#fef2f2"}; padding: 15px; border-radius: 8px; border-left: 4px solid ${alert.condition === "ABOVE" ? "#16a34a" : "#dc2626"};">
          <p style="margin: 0; color: ${alert.condition === "ABOVE" ? "#166534" : "#991b1b"}; font-weight: 500;">
            Alert triggered: Price went ${conditionText} your target of $${alert.target_price}
          </p>
        </div>
      </div>
      
      <div style="text-align: center; margin-bottom: 25px;">
        <a href="${process.env.NEXTAUTH_URL}/alerts" 
           style="background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 500; display: inline-block;">
          View All Alerts
        </a>
      </div>
      
      <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
        <p style="margin: 0; color: #64748b; font-size: 12px;">
          This alert has been automatically deactivated. You can create a new alert in your dashboard.
        </p>
        <p style="margin: 10px 0 0 0; color: #64748b; font-size: 12px;">
          © ${new Date().getFullYear()} StockInsight. All rights reserved.
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: 'StockInsight Alerts <qwerty7391999@gmail.com>',
      to: userEmail,
      subject: `🚨 Price Alert Triggered: ${alert.symbol}`,
      html: htmlContent,
    });
    
    console.log(`Alert email sent successfully via Gmail to ${userEmail} for ${alert.symbol}`);
  } catch (error) {
    console.error(`Failed to send Gmail email to ${userEmail}:`, error);
  }
}
*/

export async function GET(request: NextRequest) {
  try {
    console.log("Starting price alert check...");

    // Verify this is a cron job request (optional security measure)
    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    //   console.log("Unauthorized cron request");
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Get all active alerts
    const activeAlerts = await prisma.price_alert.findMany({
      where: {
        status: "ACTIVE",
        OR: [
          { expires_at: null },
          { expires_at: { gt: new Date() } }
        ]
      }
    });

    console.log(`Found ${activeAlerts.length} active alerts to check`);

    if (activeAlerts.length === 0) {
      return NextResponse.json({
        message: "No active alerts to check",
        checked: 0,
        triggered: 0
      });
    }

    let triggeredCount = 0;
    const processedSymbols = new Set<string>();

    // Group alerts by symbol to minimize API calls
    const alertsBySymbol = activeAlerts.reduce((acc, alert) => {
      if (!acc[alert.symbol]) {
        acc[alert.symbol] = [];
      }
      acc[alert.symbol].push(alert);
      return acc;
    }, {} as Record<string, typeof activeAlerts>);

    // Process each symbol
    for (const [symbol, alerts] of Object.entries(alertsBySymbol)) {
      try {
        const currentPrice = await fetchMarketPrice(symbol);

        if (currentPrice === null) {
          console.log(`Skipping ${symbol} - could not fetch price`);
          continue;
        }

        console.log(`${symbol}: Current price $${currentPrice}`);
        processedSymbols.add(symbol);

        // Check each alert for this symbol
        for (const alert of alerts) {
          let shouldTrigger = false;
          const targetPrice = Number(alert.target_price);

          if (alert.condition === "ABOVE" && currentPrice >= targetPrice) {
            shouldTrigger = true;
          } else if (alert.condition === "BELOW" && currentPrice <= targetPrice) {
            shouldTrigger = true;
          }

          if (shouldTrigger) {
            console.log(`Triggering alert ${alert.id} for ${symbol}: ${currentPrice} ${alert.condition.toLowerCase()} ${targetPrice}`);

            // Update alert status to TRIGGERED
            await prisma.price_alert.update({
              where: { id: alert.id },
              data: {
                status: "TRIGGERED",
                triggered_at: new Date()
              }
            });

            // Send email notification
            await sendAlertEmail(alert.email, alert, currentPrice);

            triggeredCount++;
          }
        }

        // Add small delay between API calls to be respectful
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.error(`Error processing alerts for ${symbol}:`, error);
      }
    }

    console.log(`Price alert check completed. Checked ${processedSymbols.size} symbols, triggered ${triggeredCount} alerts`);

    return NextResponse.json({
      message: "Price alert check completed",
      checked: processedSymbols.size,
      triggered: triggeredCount,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error in price alert cron job:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
} 