# Wissem UI — consignes de projet

Wissem UI est le système de design partagé et le Nuxt Layer des produits compatibles de Wissem’s Industries. Le paquet est publié sur GitHub Packages, pas sur GHCR.

## Architecture et contrats

- Le paquet étend Nuxt avec le thème et les valeurs par défaut de Nuxt UI, Tailwind et les icônes. Les applications consommatrices déclarent `@wissem-industries/ui` dans `extends`.
- Ne pas créer de wrappers de composants sans besoin démontré; les consommateurs gardent leurs propres pages, comportements et règles métier. Les composants d'application (`WPageHeader`, `WStatTiles`, `WFilterBar`, `WPill`, `WSection`, `WActionBar`, `WEmptyState`, `WAuthGate`…) servent Stages et Housing : sans règle métier, textes par props.
- Les applications compatibles utilisent `UApp` à la racine. Le favicon fourni est remplaçable par `public/favicon.ico` dans un produit.
- Le Layer fournit `app/error.vue` (`WStatusPage` : 404, 403, 500, maintenance, hors ligne, bientôt) : une application n'écrit pas sa propre page d'erreur sans besoin, elle peut réutiliser `WStatusPage` avec ses textes. Textes en français et en anglais dans `app/utils/wi-status.ts`.
- Typographie : Funnel Display pour les titres (`h1` à `h3`, `font-display`), Funnel Sans pour le texte, Geist Mono pour les libellés et le code, toutes locales au paquet (`@fontsource-variable`) ; ne pas réintroduire une dépendance aux Google Fonts pour le rendu normal.
- L'accent primaire est un violet saturé, de la même famille que les formes décoratives : palette dédiée `wsm-violet` dans `tokens.css`, 600 (`#7b1ff5`) en clair et 400 (`#a05cff`) en sombre. Ne pas le rendre pastel (luminosité trop haute) ni revenir au violet électrique pur `#7F00FF`. Ne pas modifier les palettes Tailwind ni les couleurs secondaires ou de statut pour ajuster le primaire. Vérifier le contraste sur les pages, les cartes et les contrôles.
- Aucun aplat de couleur pleine sur les boutons et les contrôles (`controls.css`) : le bouton principal est en verre violet (teinte, reflet, bord violet), le secondaire en contour violet sans teinte ; cases, radios et interrupteurs cochés prennent une teinte violette avec un bord violet. Les libellés violets prennent la nuance 700 en clair et 300 en sombre pour garder 4,5:1 sur la teinte.
- Survol des cartes `WGlassCard` : une carte statique (texte, compétences, langues, coordonnées, formulaire) garde le halo violet qui suit le pointeur, sans soulèvement ni bord violet ; une carte interactive (elle mène quelque part ou porte les actions d'un élément, comme une carte de projet) prend `interactive` : soulèvement court et bord violet, sans halo. `:halo="false"` reste une exception justifiée, pas l'usage courant. Les consommateurs ne recréent pas ces effets dans leur CSS.
- Ce paquet n’est pas l’identité métier de produits nécessitant un système sectoriel tel que DSFR; leurs besoins restent dans leurs dépôts.

## Stack et publication

- Nuxt 4, Vue 3, TypeScript, Nuxt UI 4, Tailwind CSS 4, Bun 1.4.x et Biome 2.
- Installer avec `bun install --frozen-lockfile`. `bun run check` exécute lint, typecheck, build du playground et vérification du paquet.
- Vérifier la compatibilité et le lockfile de chaque consommateur avant de modifier une API du Layer ou de monter la version publiée.
- Versions : SemVer, CHANGELOG tenu à chaque PR (section `Unreleased`), montée par `bun run release <x.y.z>` dans une PR `chore(release): vX.Y.Z`. Woodpecker publie le paquet npm `@wissem-industries/ui` dans GitHub Packages sur le tag `vX.Y.Z`. Garder son secret d’écriture uniquement dans la CI et le token de lecture dans la configuration utilisateur des consommateurs.
- Respecter les conventions communes de Wissem's Industries, notamment les images Alpine/Bun et l’encodage UTF-8 BOM pour les scripts PowerShell.
- Mettre à jour ce fichier automatiquement quand Wissem formule une règle durable de design system; reporter les règles transverses au dépôt central.

- TypeScript 7 : utiliser Golar (golar et @golar/vue) pour les composants Vue, via le CLI Nuxt exécuté avec Node. Les images de validation installent nodejs ; préserver ce choix dans les workflows push, PR et tag.
