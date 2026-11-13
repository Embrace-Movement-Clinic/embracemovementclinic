# Domain and email clean-up (Crazy Domains)

Where we're up to, as of 7 November 2026. No passwords or logins go in this file.

## What Nicole pays for at Crazy Domains

| Product | Domain | Ends | What it's doing | Plan |
|---|---|---|---|---|
| Domain registration | embracemovementclinic.com.au | 28 Oct 2027 | The main domain | **Keep** (auto-renew on) |
| Premium DNS | embracemovementclinic.com.au | **Renews 20 Nov 2026** | Holds the domain's DNS, including the email records that send mail to Google Workspace | **Let it renew for now.** Move DNS to Cloudflare at launch, then turn it off |
| Business Hosting – Standard Classic 2025 | embracemovementclinic.com.au | 22 May 2028 | Nothing. Checked in cPanel: no mailboxes, empty `public_html`, no forwarders | **Cancel.** Ask support for a pro-rata refund |
| Unlimited Email | embracemovementclinic.com.au | 7 Feb 2027 | 5 old mailboxes (below) | **Copy the old mail into Google first**, then turn off renewal |
| Domain Privacy | embracemovementclinic.com.au | 21 Oct 2027 | Not needed: .au lookups already hide contact details | Turn off renewal |
| Domain registration | embracemc.com.au | 7 Nov 2027 | Its email still comes to the Unlimited Email mailboxes | Decide after the mailbox check (below) |
| Domain Privacy | embracemc.com.au | 21 Oct 2027 | Not needed (.au) | Turn off renewal |
| Domain Expiry Protection | embracemc.com.au | Expired 31 Oct 2025 | — | Ignore. Don't renew |
| Domain registration + Privacy | embracemovementclinic.com | 28 Oct 2027 | Nothing yet | Keep; forward it to the main site after launch |
| Domain registration | embracemovementclinic.online | 17 Sep 2027 | Parked page | Let it lapse |
| Domain Guard | embracemovementclinic.online | 17 Sep 2027 | Not needed | Turn off renewal |

**Don't click "Renew all"** in Crazy Domains: it renews the add-ons too.

## The old mailboxes (Unlimited Email, in its cPanel)

| Mailbox | Size | Status |
|---|---|---|
| nicole@embracemovementclinic.com.au | 594 MB | Archive only (new mail goes to Google) |
| admin@embracemovementclinic.com.au | 155 MB | Archive only |
| hello@embracemovementclinic.com.au | 5 MB | Archive only |
| nicole@embracemc.com.au | 167 MB | **Still receives mail** |
| admin@embracemc.com.au | 97 MB | **Still receives mail** |

Don't delete any of these mailboxes in cPanel. Letting the product lapse keeps them as a backup until 7 Feb 2027.

## Done

- [x] Listed every Crazy Domains product
- [x] Checked the Business Hosting cPanel: empty, safe to cancel
- [x] Found the 5 old mailboxes and which domains they belong to

- [x] Test admin@embracemovementclinic.com.au: arrives in Google (13 Nov 2026)
- [x] hello@embracemovementclinic.com.au bounced ("address not found"); not used on the old or new site. Follow-up recorded in the launch checklist (item 24)
- [x] **Squarespace login moved off the old domain (13 Nov 2026).** The Squarespace account's login email was admin@embracemc.com.au; it's now admin@embracemovementclinic.com.au, and Nicole is the site owner under that address. Other accounts may still use the embracemc.com.au addresses: check the mailboxes (step 3) before letting that domain's email go

- [x] **admin@embracemc.com.au already forwards to the main domain (found 13 Nov 2026).** The forwarding runs on the Unlimited Email product, so it stops when that ends on 7 Feb 2027. Plan: after launch and before 7 Feb 2027, add embracemc.com.au to Google Workspace as a user alias domain (and point its mail at Google), so mail keeps arriving without the old server; then let Unlimited Email lapse. Still to check: the full list under cPanel → Email → Forwarders (is nicole@embracemc.com.au forwarded too?)

## Next (pick up here)

1. [ ] **Test admin@embracemovementclinic.com.au** by sending it an email from a personal account. It's the address on the website, so it must arrive in Google.
2. [ ] **Test hello@embracemovementclinic.com.au** the same way. If it bounces, add it in the Google Admin console as an alias of admin@ or nicole@.
3. [ ] **Check the embracemc.com.au mailboxes.** In cPanel, click **Check Email** on each and note the date of the newest real email (not spam).
   - If it's recent, add embracemc.com.au to Google Workspace as an alias domain, then point its mail at Google.
   - If it's only old mail or spam, copy the archive and let the address go.
4. [ ] **Copy the old mail into Google** (before 7 Feb 2027).
   - Where: Google Admin console → **Data** → **Data import & export** → **Data migration** → **Email**
   - Source: **Other IMAP server**, server `mail.embracemovementclinic.com.au`, port `993`
   - For each mailbox: reset its password under **Manage** in cPanel if needed, then map it to the Google account it should go into.
5. [ ] **Cancel Business Hosting** and ask for a pro-rata refund.
6. [ ] **Turn off renewal** on:
   - Domain Privacy (both .com.au domains)
   - Domain Guard (.online)
   - Unlimited Email, once step 4 is done
7. [ ] **By 20 Nov 2026:** let Premium DNS renew. Ask whether it can be monthly or refunded pro rata.

## At launch

- [ ] Move the main domain's DNS to Cloudflare, copying every record exactly (especially the Google email records). Claude will prepare the record list. Then turn off Premium DNS.
- [ ] Add SPF, DKIM and DMARC records for Google Workspace, so clinic emails don't land in spam. None are set up now.
- [ ] Forward embracemovementclinic.com to the main site.
