// Email Sequence Templates for Lead Nurturing
// These are used by the email automation system

export const emailSequence = [
  {
    id: 1,
    subject: "🎁 Your Free Sales Portfolio Template is Here!",
    delay: 0, // Sent immediately
    getBody: (lead) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px; text-align: center;">
          <h1 style="color: #f59e0b; margin: 0;">Your Template is Ready!</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <p>Thanks for downloading the Briefkase Sales Portfolio Template!</p>
          <p><strong>Pro Tip:</strong> Include specific metrics — say "142% quota attainment" not just "exceeded quota."</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://thebriefkase.com" style="background: #f59e0b; color: #1e293b; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Build My Portfolio</a>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 2,
    subject: "📊 Why Portfolios Outperform Resumes (Data Inside)",
    delay: 2, // 2 days after signup
    getBody: (lead) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px; text-align: center;">
          <h1 style="color: #f59e0b; margin: 0;">The Resume Problem</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <h2 style="color: #1e293b;">Here's Why Your Resume Isn't Getting Callbacks</h2>
          
          <p>Recruiters spend an average of <strong>7.4 seconds</strong> on each resume. In that time, they can't see:</p>
          
          <ul style="color: #475569;">
            <li>Your actual sales performance metrics</li>
            <li>The complexity of deals you've closed</li>
            <li>Your strategic thinking process</li>
            <li>Visual proof of your achievements</li>
          </ul>
          
          <div style="background: #f8fafc; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #1e293b;">The Portfolio Advantage:</p>
            <p style="margin: 10px 0 0; color: #475569;">Sales professionals with portfolios get <strong>3x more interview callbacks</strong> than those with resumes alone.</p>
          </div>
          
          <p>Your portfolio tells the story your resume can't — through data, visuals, and concrete examples.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://thebriefkase.com" style="background: #f59e0b; color: #1e293b; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Start Building Your Portfolio</a>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 3,
    subject: "🏆 3 Portfolios That Landed Dream Jobs (Real Examples)",
    delay: 4, // 4 days after signup
    getBody: (lead) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px; text-align: center;">
          <h1 style="color: #f59e0b; margin: 0;">Real Portfolio Success Stories</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <h2 style="color: #1e293b;">See What's Working Right Now</h2>
          
          <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="font-weight: bold; color: #1e293b; margin-bottom: 5px;">📌 Sarah M. — Enterprise AE</p>
            <p style="color: #475569; margin: 0;">Used the KPI dashboard to showcase 156% quota attainment. Landed at a Series C startup with 40% salary increase.</p>
          </div>
          
          <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="font-weight: bold; color: #1e293b; margin-bottom: 5px;">📌 Marcus T. — SDR to AE</p>
            <p style="color: #475569; margin: 0;">Case studies showed strategic thinking beyond his current role. Promoted internally within 3 months.</p>
          </div>
          
          <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <p style="font-weight: bold; color: #1e293b; margin-bottom: 5px;">📌 Jennifer L. — Sales Manager</p>
            <p style="color: #475569; margin: 0;">Team metrics dashboard impressed hiring committee. Now VP of Sales at a Fortune 500.</p>
          </div>
          
          <p style="color: #475569;">What made these portfolios stand out? <strong>Specific metrics + clear storytelling + professional design.</strong></p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://thebriefkase.com" style="background: #f59e0b; color: #1e293b; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Create Your Success Story</a>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 4,
    subject: "🎉 Your Exclusive 20% Discount (48 Hours Only)",
    delay: 6, // 6 days after signup
    getBody: (lead) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px; text-align: center;">
          <h1 style="color: #f59e0b; margin: 0;">Exclusive Offer Inside</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <h2 style="color: #1e293b; text-align: center;">20% Off Your Portfolio</h2>
          
          <div style="background: #fef3c7; border: 2px dashed #f59e0b; border-radius: 12px; padding: 30px; margin: 20px 0; text-align: center;">
            <p style="color: #92400e; margin: 0 0 10px; font-size: 14px;">YOUR EXCLUSIVE CODE:</p>
            <p style="color: #1e293b; font-size: 32px; font-weight: bold; margin: 0; letter-spacing: 3px;">${lead.discount_code || 'BRIEFKASE20'}</p>
            <p style="color: #92400e; margin: 10px 0 0; font-size: 14px;">Expires in 48 hours</p>
          </div>
          
          <p style="color: #475569;">You've seen the template. You know what a portfolio can do for your career. Now's the time to invest in yourself.</p>
          
          <table style="width: 100%; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Starter</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-decoration: line-through; color: #94a3b8;">$49</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #059669; font-weight: bold;">$39</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Professional</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; text-decoration: line-through; color: #94a3b8;">$149</td>
              <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #059669; font-weight: bold;">$119</td>
            </tr>
            <tr>
              <td style="padding: 10px;"><strong>Elite</strong></td>
              <td style="padding: 10px; text-decoration: line-through; color: #94a3b8;">$299</td>
              <td style="padding: 10px; color: #059669; font-weight: bold;">$239</td>
            </tr>
          </table>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://thebriefkase.com/#pricing" style="background: #f59e0b; color: #1e293b; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Claim My 20% Discount</a>
          </div>
          
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">This offer expires in 48 hours and won't be repeated.</p>
        </div>
      </div>
    `
  },
  {
    id: 5,
    subject: "⭐ \"Best Investment I Made\" — What They're Saying",
    delay: 8, // 8 days after signup
    getBody: (lead) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px; text-align: center;">
          <h1 style="color: #f59e0b; margin: 0;">Don't Take Our Word For It</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <h2 style="color: #1e293b;">Real Results From Real Sales Pros</h2>
          
          <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <div style="color: #f59e0b; font-size: 24px; margin-bottom: 10px;">★★★★★</div>
            <p style="color: #475569; font-style: italic; margin: 0 0 10px;">"I booked three interviews in one week after sending my portfolio. The dashboard layout is exactly what hiring managers want to see."</p>
            <p style="color: #1e293b; font-weight: bold; margin: 0;">— SDR Candidate, Tech</p>
          </div>
          
          <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <div style="color: #f59e0b; font-size: 24px; margin-bottom: 10px;">★★★★★</div>
            <p style="color: #475569; font-style: italic; margin: 0 0 10px;">"Recruiters told me it was the best candidate presentation they've ever seen. Landed my dream role at 30% higher comp."</p>
            <p style="color: #1e293b; font-weight: bold; margin: 0;">— Account Executive, SaaS</p>
          </div>
          
          <div style="background: #f8fafc; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <div style="color: #f59e0b; font-size: 24px; margin-bottom: 10px;">★★★★★</div>
            <p style="color: #475569; font-style: italic; margin: 0 0 10px;">"The Briefkase boosted my confidence and helped me stand out instantly. Worth every penny."</p>
            <p style="color: #1e293b; font-weight: bold; margin: 0;">— Enterprise Sales, Fortune 500</p>
          </div>
          
          <p style="color: #475569; text-align: center;">Join hundreds of sales professionals who've transformed their job search.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://thebriefkase.com/#pricing" style="background: #f59e0b; color: #1e293b; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Join Them Today</a>
          </div>
          
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">Remember: Your code ${lead.discount_code || 'BRIEFKASE20'} is still active!</p>
        </div>
      </div>
    `
  },
  {
    id: 6,
    subject: "⏰ Final Notice: Your Discount Expires Tonight",
    delay: 10, // 10 days after signup
    getBody: (lead) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #7f1d1d 0%, #450a0a 100%); padding: 40px; text-align: center;">
          <h1 style="color: #fef2f2; margin: 0;">Last Chance</h1>
        </div>
        <div style="padding: 30px; background: #fff;">
          <h2 style="color: #1e293b; text-align: center;">Your 20% Discount Expires at Midnight</h2>
          
          <p style="color: #475569;">I wanted to reach out one last time before your exclusive offer expires.</p>
          
          <p style="color: #475569;">Over the past week, you've learned:</p>
          
          <ul style="color: #475569;">
            <li>Why portfolios outperform resumes</li>
            <li>Real examples of successful portfolios</li>
            <li>How other sales pros landed their dream roles</li>
          </ul>
          
          <p style="color: #475569;">Now it's your turn.</p>
          
          <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
            <p style="color: #92400e; margin: 0 0 5px; font-size: 14px;">FINAL REMINDER:</p>
            <p style="color: #1e293b; font-size: 28px; font-weight: bold; margin: 0;">${lead.discount_code || 'BRIEFKASE20'}</p>
            <p style="color: #dc2626; margin: 10px 0 0; font-weight: bold;">Expires Tonight at Midnight</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://thebriefkase.com/#pricing" style="background: #dc2626; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Claim My Discount Now</a>
          </div>
          
          <p style="color: #475569;">Or, if you'd prefer to have us build your portfolio for you:</p>
          
          <div style="text-align: center; margin: 20px 0;">
            <a href="https://thebriefkase.com/#pricing" style="background: #1e293b; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Have Us Build It For You →</a>
          </div>
          
          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 30px;">After tonight, pricing returns to normal. This offer won't be extended.</p>
        </div>
        
        <div style="background: #1e293b; padding: 20px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">© 2025 TheBriefkase.com — Stand out. Get hired.</p>
        </div>
      </div>
    `
  }
];

export default emailSequence;