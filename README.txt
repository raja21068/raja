PUBLICATION LIST UPDATE — 20 October 2026
==========================================

Input files:
  CV.tex (the authoritative source for names, categories, author order,
          publication details, dates/years, and URLs)
  journal-papers.html, conference-papers.html, book-chapter.html

Updated replacements (retain these filenames when publishing):
  journal-papers.html         47 journal articles  (previously 41)
  conference-papers.html      19 conference papers (previously 20)
  book-chapter.html            1 book chapter      (previously 1)

Additional pages:
  publications.html           all 78 scholarly works (full searchable index)
  other-articles.html          5 other peer-reviewed articles
  preprints.html               6 preprints
  paper-list.csv             machine-readable inventory of all 78 works

New journal articles not previously on journal-papers.html:
  - ANN-guided multi-objective optimization of SPEEK/MXene nanocomposite membranes for microbial fuel cell wastewater treatment and energy recovery (2027)
  - A secure, transparent, and decentralised framework for cross-domain healthcare data sharing using blockchain-based EHRs (2026)
  - Random Forest and differential evolution for maximizing microbial fuel cell performance in wastewater remediation (2026)
  - RePFL: lag-resilient personalized federated learning for skin cancer detection under extreme non-IID heterogeneity (2026)
  - BotWard: A resilient framework for detecting and mitigating botnets in complex social networks through pseudo-random nickname identification (2025)
  - Privacy-preserving federated transfer learning for enhanced liver lesion segmentation in PET-CT imaging (2025)

Reclassification:
  "Evaluating the Performance of Deep Neural Networks for Health Decision
  Making" was in the old conference HTML but is listed by CV.tex as an
  Other peer-reviewed article. It is retained in that section.

Corrected author positions (per CV.tex): 6
  - Zero-Trust Medical Image Sharing: A Secure and Decentralized Approach Using Blockchain and the IPFS
  - Phased Array Antenna Diagnosis from Amplitude-Only Data Using Parallel Deep Learning Models
  - Robust Mobile Robot Navigation in Cluttered Environments Based on Hybrid Adaptive Neuro-Fuzzy Inference and Sensor Fusion
  - Efficient Hybrid Clustering Scheme for Data Delivery Using Internet of Things Enabled Vehicular Ad Hoc Networks in Smart City Traffic Congestion
  - Visual Features with Spatio-Temporal-Based Fusion Model for Cross-Dataset Vehicle Re-Identification
  - Internet of Things—Smart Traffic Management System for Smart Cities Using Big Data Analytics

Year differences (CV.tex takes precedence): 5
  - Autonomous Ship Navigation with an Enhanced Safety Collision Avoidance Technique
  - Responsible Recommendation Services with Blockchain Empowered Asynchronous Federated Learning
  - MCNN: A Multi-Level CNN Model for the Classification of Brain Tumors in IoT-Healthcare System
  - An Online Semantic-Enhanced Graphical Model for Evolving Short Text Stream Clustering
  - Malicious URL Detection Using Multi-Layer Filtering Model

Important notes:
  * CV.tex's detailed inventory adds to 78 works (47+5+19+1+6), while its
    masthead says "72 Publications". The detailed inventory was followed;
    CV.tex was not modified.
  * One CV entry identifies a Biochemical Engineering Journal paper with
    a 2027 volume year. As of October 2026, this is a future year; it is
    reproduced exactly from the CV and not independently verified.
  * Citation counts are historical figures carried from the original HTML
    (where numeric) and are NOT current figures. Missing citations show —.
  * The CV does not specify Rajesh Kumar's author position for the article
    "Modelling Choice Selection System of a Public Sector General
    University in Pakistan", so the HTML/CSV mark it as not specified.
  * Publication links come from CV.tex, falling back to the original pages.
    URL reachability was not externally validated.
  * All HTML pages work as static files; no network libraries needed.
  * Upload all HTML files together in the same website directory so the
    navigation links work correctly. You can use publications.html as
    a new entry point to the paper list.


PATENT & REGISTERED DESIGN INTEGRATION — 20 October 2026
=======================================================
New input: patents.html, supplied separately after the publication update.

Added or updated files:
  research-portfolio.html     unified searchable index: 78 publications + 11 IP records
  patents.html                full patent/design page with original records, search and status filters
  patent-list.csv             11-record IP inventory
  research-portfolio.csv      unified 89-record export with record-type and year definitions
  publications.html           added patent/design callout and cross-site navigation
  journal-papers.html         added cross-site navigation
  conference-papers.html      added cross-site navigation
  book-chapter.html           added cross-site navigation
  other-articles.html          added cross-site navigation
  preprints.html               added cross-site navigation

The 78 scholarly works and paper-list.csv remain unchanged. The unified
index combines navigation, not academic publication counts. Patent records
are NOT treated as papers. Chinese records identify 瑞嘉 (Ruijia), while
UK design documents identify Rajesh Kumar; the user's supplied patent page
specifically says their identity linkage has not been established. The UK
design records retain the evidence and ownership caveats; patent statuses
and dates are reproduced as supplied, not independently rechecked.

For publishing: put all HTML files into the SAME website directory and
point your homepage or portfolio link to research-portfolio.html. All
links among pages use relative filenames; no build or server is required.
