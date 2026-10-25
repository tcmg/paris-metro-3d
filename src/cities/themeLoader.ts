/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// TODO(security): Backend authentication, session management, CSRF tokens,
// file upload validation, and SQL database controls do not apply because this
// is a static client-side theme loader with strict allow-listed stylesheets.

import { CityCulturalUITheme } from './types';

const ALLOWED_CITY_SLUGS = new Set([
  'paris',
  'rio',
  'sydney',
  'london',
  'nyc',
  'porto',
  'tokyo',
  'san-francisco',
  'warsaw',
  'zurich',
  'melbourne'
]);
const SAFE_CITY_REGEX = /^[a-z0-9][a-z0-9_-]{1,23}$/;

const THEME_LINK_ELEMENT_ID = 'city-cultural-theme-stylesheet';
const FONT_LINK_ELEMENT_ID = 'city-cultural-google-fonts';

/**
 * Dynamically applies a city's cultural CSS theme and font pairings using
 * strictly safe DOM APIs (createElement, setAttribute, dataset).
 */
export function applyCityCulturalTheme(theme: CityCulturalUITheme): void {
  const slug = theme.cityId.trim().toLowerCase();
  if (!ALLOWED_CITY_SLUGS.has(slug) && !SAFE_CITY_REGEX.test(slug)) {
    throw new Error('Untrusted city theme identifier.');
  }

  document.documentElement.setAttribute('data-city-theme', slug);

  // Apply CSS custom properties directly on :root for immediate transitions
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--bg-obsidian', theme.palette.bgObsidian);
  rootStyle.setProperty('--bg-panel', theme.palette.bgPanel);
  rootStyle.setProperty('--bg-panel-elevated', theme.palette.bgPanelElevated);
  rootStyle.setProperty('--gold-bright', theme.palette.primaryBright);
  rootStyle.setProperty('--gold-primary', theme.palette.primaryMain);
  rootStyle.setProperty('--gold-muted', theme.palette.primaryMuted);
  rootStyle.setProperty('--gold-border', theme.palette.borderSubtle);
  rootStyle.setProperty('--gold-border-strong', theme.palette.borderStrong);
  rootStyle.setProperty('--gold-glow', theme.palette.accentGlow);
  rootStyle.setProperty('--ivory', theme.palette.textPrimary);
  rootStyle.setProperty('--ivory-dim', theme.palette.textDim);
  rootStyle.setProperty('--ivory-subtle', theme.palette.textSubtle);
  rootStyle.setProperty('--emerald-guimard', theme.palette.secondaryAccent);
  rootStyle.setProperty('--crimson-ghost', theme.palette.alertAccent);
  rootStyle.setProperty('--font-display', theme.fonts.display);
  rootStyle.setProperty('--font-serif', theme.fonts.serif);
  rootStyle.setProperty('--font-sans', theme.fonts.sans);
  rootStyle.setProperty('--font-mono', theme.fonts.mono);

  // Safely attach Google Fonts stylesheet if specified and from https://fonts.googleapis.com
  if (
    theme.googleFontsUrl &&
    theme.googleFontsUrl.startsWith('https://fonts.googleapis.com/')
  ) {
    let fontLink = document.getElementById(FONT_LINK_ELEMENT_ID) as HTMLLinkElement | null;
    if (!fontLink) {
      fontLink = document.createElement('link');
      fontLink.setAttribute('id', FONT_LINK_ELEMENT_ID);
      fontLink.setAttribute('rel', 'stylesheet');
      document.head.appendChild(fontLink);
    }
    fontLink.setAttribute('href', theme.googleFontsUrl);
  }

  // Safely attach city-specific cultural theme CSS file
  const expectedHref = `/src/styles/themes/${slug}.css`;
  let themeLink = document.getElementById(THEME_LINK_ELEMENT_ID) as HTMLLinkElement | null;
  if (slug === 'paris') {
    if (themeLink) {
      themeLink.remove();
    }
    return;
  }

  if (!themeLink) {
    themeLink = document.createElement('link');
    themeLink.setAttribute('id', THEME_LINK_ELEMENT_ID);
    themeLink.setAttribute('rel', 'stylesheet');
    document.head.appendChild(themeLink);
  }
  themeLink.setAttribute('href', expectedHref);
}
