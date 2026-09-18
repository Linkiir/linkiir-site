# Linkiir website

Extract the complete ZIP and open index.html. GitHub Pages deployment uses dist/.

## Current revision

- Restored “Move healthcare data forward” and adjusted logo alignment.
- Kept the constrained desktop hero and muted green palette.
- Product runtime animation shows one automatic documented flow, with pause and step controls. Reduced-motion preferences are respected.
- Removed performance statistics and connector CSV export. Catalogue search and filters remain.
- Replaced the original local video with the supplied Loom overview. Playback needs internet access and Loom availability.
- Product screenshots appear one at a time in a sliding frame with arrows, keyboard and swipe navigation.
- Simplified the AI page and added an animated Linkiir Agent concept for patient-flow charts, laboratory activity and CMIO reporting. Agent remains coming soon, with synthetic preview data clearly identified. Customer control and current Grid AI approvals remain explicit.

## Checks

Local links and anchors, JavaScript syntax, CSS brace checks, carousel interactions and Agent animation progression were checked. Browser visual verification remains blocked by the saved local-preview permission. No production deployment or form submission was made.

## High-resolution product captures

Replaced the original low-resolution screenshots with the supplied September 18 PNG captures. The homepage uses Workflow Builder. The Product carousel contains six distinct views: Workflow Builder, Dashboard, Projects, Scripting, Monitor and Message logs. The duplicate tall dashboard capture is omitted. Images remain unchanged, with their original pixel dimensions; the carousel displays one uncropped image at a time and caps its width at 1000 CSS pixels.

## Sandbox and customer-control update

Added a 15-day sandbox request page using the existing Web3Forms inbox configuration. This requests follow-up, not automated provisioning; no live submission was sent. Header and footer access links and the old downloads route lead to this page. Removed the GitHub release link from Resources. Added an enterprise evaluation checklist for workflow fit, controls and recovery.

Removed Projects from the five-image carousel. Replaced the evidence band with the user-supplied statement that 1,000+ interfaces are running on Grid today. Home and AI explain operation without AI and customer-selected models and endpoints; externally configured providers are explicitly distinguished from self-hosted processing. Local links, anchors and JavaScript syntax were checked.

## Google Ads landing pages

Two focused pages are included at dist/hl7-fhir-integration/index.html and dist/healthcare-integration-engine/index.html. Both use the actual Workflow Builder image and link to the sandbox request and technical demo forms. A fixed campaign identifier carries the originating landing page into form submissions. This is basic lead-source attribution, not a configured Google Ads campaign or a verified conversion-tracking setup. No ad campaigns or site deployment were performed.

Updated the homepage, both advertising landing pages and the engine FAQ to the user-supplied claim: 1,000+ interfaces running today.

## Clean hosted URLs

Hosted navigation uses directory routes such as /product/, /ai/, /sandbox/, /hl7-fhir-integration/ and /healthcare-integration-engine/. Each directory retains index.html so GitHub Pages serves it automatically. Queries and anchors are preserved. Legacy redirects use the clean route online. Opening the extracted site through file:// restores explicit index.html links at runtime for local browsing. Direct visits to a hosted index.html normalize the address using history.replaceState. No hosting deployment was performed.
