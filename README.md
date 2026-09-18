# Linkiir website

The website is at the root of this ZIP. Extract the complete archive and upload its contents to the repository root. There is no dist folder or redirect through a build directory.

## Hosting

The included GitHub Pages workflow publishes the repository root. Hosted links use clean directory URLs, including /product/, /ai/, /integrations/, /resources/ and /sandbox/. The advertising landing pages are /hl7-fhir-integration/ and /healthcare-integration-engine/. Each route contains an index.html file, which the host serves as its default document without including the filename in navigation.

Open the root index.html to browse locally. The local-browsing helper restores explicit file links only for file:// browsing. Hosted navigation preserves clean URLs, query parameters and anchors.

robots.txt allows all crawlers, including AI crawlers. Individual crawler behavior and indexing are controlled by the crawler provider.

## Current content

The homepage uses the supplied Loom overview. Five high-resolution product screenshots appear in a single-frame carousel. Grid can run with or without configurable AI. Agent analytics are explicitly marked as a coming-soon concept with synthetic data. The interface-count claim is user-supplied: 1,000+ interfaces running today. Performance benchmark claims and connector CSV export have been removed.

The 15-day sandbox form uses the existing enquiry service and requests team follow-up; it does not automatically provision access. Landing-page identifiers are included in resulting enquiries. No live form submissions, advertising campaigns or production deployments were performed.

## Verification

Local route, asset and anchor checks and JavaScript syntax checks pass. Browser visual verification remains blocked by the saved local-preview permission.

## Mobile refinements

The mobile header hides the sandbox CTA below 900px. Dense grids, forms, evidence sections and callouts stack into one column; buttons wrap, headings scale and carousel captions use natural height. Detailed charts and tables scroll within their own panels. Product flow nodes stack their text on narrow phones. Existing in-page sandbox access remains available. These changes have code-level verification; rendered mobile preview remains unavailable.

## Search visibility

Added descriptive search titles, self-referencing clean canonical URLs, Open Graph metadata, Organization/WebPage structured data, a Grid SoftwareApplication description and sitemap.xml. robots.txt points crawlers to the sitemap. Added buyer evaluation content and resource links for healthcare integration engine and HL7/FHIR searches, including US buyer context without unsupported location or certification claims.

After publishing, verify the domain in Google Search Console, submit https://linkiir.com/sitemap.xml and inspect the key landing pages. Track impressions and clicks by US country and target query, and use approved customer case studies and relevant industry links to develop evidence and authority. No search rankings, Search Console setup or rich-result eligibility are guaranteed. This update has not been deployed.

## Mobile layer-animation repair

Changed the Inside Linkiir Grid animation panel to natural-height rows on mobile, separating the canvas, layer controls and footnote. Compact canvas planes have more vertical separation and all labels are painted after the geometry on opaque backgrounds. Mobile layer selection shows the matching description without scroll-observer overrides; desktop retains the scroll-driven journey. Visual browser verification remains unavailable.
