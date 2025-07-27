# Require4Testing - Test Management System

Ein umfassendes Test-Management-System für Requirements Engineering, entwickelt mit React, TypeScript und Supabase.

## 📋 Übersicht

Require4Testing ist ein professionelles Test-Management-System, das speziell für Teams entwickelt wurde, die strukturiertes Requirements Engineering betreiben. Das System unterstützt den gesamten Lebenszyklus von der Anforderungsdefinition bis zur Testausführung.

## 🚀 Features

### Authentifizierung und Benutzerrollen
- **Sichere Anmeldung**: E-Mail/Passwort-basierte Authentifizierung
- **Rollenbasierte Zugriffskontrolle**: Verschiedene Berechtigungsebenen
- **Automatische Profilerstellung**: Bei der Registrierung wird automatisch ein Benutzerprofil erstellt

### Anforderungsmanagement
- **Anforderungen erstellen und bearbeiten**: Vollständige CRUD-Operationen
- **Status-Tracking**: Draft → Genehmigt → Implementiert → Getestet
- **Prioritätsverwaltung**: Kritisch, Hoch, Mittel, Niedrig
- **Such- und Filterfunktionen**: Schnelles Auffinden von Anforderungen
- **Benutzer-Attribution**: Nachverfolgung wer welche Anforderung erstellt hat

### Dashboard
- **Rollenspezifische Ansichten**: Angepasste Inhalte je nach Benutzerrolle
- **Schnellstatistiken**: Übersicht über aktuelle Projekte und Aufgaben
- **Schnellstart-Guide**: Hilfestellung für neue Benutzer

## 👥 Benutzerrollen

### 1. Requirements Engineer
**Berechtigung:**
- Erstellen und verwalten von Anforderungen
- Überwachen der Anforderungsqualität
- Koordination mit Stakeholdern

**Zugriff auf:**
- Dashboard, Anforderungen, Testfälle, Testläufe

### 2. Test Manager
**Berechtigung:**
- Erstellen und verwalten von Testläufen
- Zuordnung von Testfällen zu Testern
- Überwachen des Teststatus
- Erstellen von Testfällen

**Zugriff auf:**
- Dashboard, Anforderungen, Testfälle, Testläufe

### 3. Testfallersteller
**Berechtigung:**
- Erstellen von Testfällen zu Anforderungen
- Definieren von Testschritten
- Pflege der Testfallqualität

**Zugriff auf:**
- Dashboard, Anforderungen, Testfälle

### 4. Tester
**Berechtigung:**
- Ausführen zugewiesener Tests
- Erfassen von Testergebnissen
- Dokumentation von Fehlern

**Zugriff auf:**
- Dashboard, Testfälle, Testläufe, Meine Tests

## 🛠 Technische Architektur

### Frontend
- **React 18**: Moderne React-Hooks und funktionale Komponenten
- **TypeScript**: Vollständige Typisierung für bessere Entwicklererfahrung
- **Tailwind CSS**: Utility-first CSS-Framework
- **Radix UI**: Barrierefreie, komponentenbasierte UI-Bibliothek
- **React Router**: Client-seitiges Routing
- **React Query**: Effizientes State Management für Server-Daten

### Backend
- **Supabase**: Backend-as-a-Service Plattform
- **PostgreSQL**: Robuste relationale Datenbank
- **Row Level Security (RLS)**: Sicherheit auf Datenbankebene
- **Realtime**: Live-Updates (vorbereitet für zukünftige Features)

### Authentifizierung
- **Supabase Auth**: Sichere JWT-basierte Authentifizierung
- **Session Management**: Automatisches Token-Refresh
- **E-Mail-Verifizierung**: Optionale E-Mail-Bestätigung

## 📊 Datenbankschema

### Tabellen

#### `profiles`
Erweiterte Benutzerinformationen jenseits der Standard-Auth-Tabelle.
```sql
- id (uuid, FK zu auth.users)
- email (text)
- full_name (text)
- role (text) -- requirements_engineer, test_manager, test_case_creator, tester
- created_at (timestamp)
- updated_at (timestamp)
```

#### `requirements`
Zentrale Tabelle für alle Testanforderungen.
```sql
- id (uuid, Primary Key)
- title (text)
- description (text, nullable)
- status (text) -- draft, approved, implemented, tested
- priority (text) -- low, medium, high, critical
- created_by (uuid, FK zu profiles)
- created_at (timestamp)
- updated_at (timestamp)
```

## 🎯 Verwendung

### Erste Schritte

1. **Registrierung**: Erstellen Sie ein Konto und wählen Sie Ihre Rolle
2. **Anforderungen erstellen** (Requirements Engineer): Beginnen Sie mit der Definition von Testanforderungen
3. **Testfälle entwickeln** (Test Case Creator): Erstellen Sie Testfälle zu den Anforderungen
4. **Testläufe planen** (Test Manager): Organisieren Sie Testausführungen
5. **Tests durchführen** (Tester): Führen Sie zugewiesene Tests aus

### Beispiel-Workflow

1. **Requirements Engineer** erstellt eine neue Anforderung "Benutzer-Login-System"
2. **Test Case Creator** entwickelt entsprechende Testfälle
3. **Test Manager** erstellt einen Testlauf und weist Testfälle zu
4. **Tester** führen die Tests aus und dokumentieren Ergebnisse

### Navigation

- **Dashboard**: Startseite mit rollenspezifischen Informationen
- **Anforderungen**: Verwaltung aller Testanforderungen
- **Testfälle**: Erstellung und Verwaltung von Testfällen
- **Testläufe**: Organisation von Testausführungen
- **Meine Tests**: Persönliche Testübersicht für Tester

## 🔧 Entwicklung

### Lokale Installation

```bash
# Repository klonen
git clone [repository-url]
cd require4testing

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev
```

### Code-Struktur

```
src/
├── components/          # Wiederverwendbare UI-Komponenten
│   ├── ui/             # Basis-UI-Komponenten (shadcn/ui)
│   └── Layout.tsx      # Hauptlayout mit Navigation
├── hooks/              # Custom React Hooks
│   ├── useAuth.tsx     # Authentifizierungs-Hook
│   └── use-toast.ts    # Toast-Benachrichtigungen
├── integrations/       # Externe Integrationen
│   └── supabase/       # Supabase-Client und Typen
├── lib/                # Utility-Funktionen
├── pages/              # Hauptseiten der Anwendung
│   ├── Auth.tsx        # Login/Registrierung
│   ├── Index.tsx       # Dashboard
│   ├── Requirements.tsx # Anforderungsmanagement
│   └── NotFound.tsx    # 404-Seite
└── main.tsx           # Anwendungseingang
```

## 📝 Hinweise für Entwickler

### Neue Komponenten erstellen
1. Verwenden Sie TypeScript für alle neuen Komponenten
2. Implementieren Sie umfassende JSDoc-Kommentare
3. Nutzen Sie die bestehenden UI-Komponenten aus dem `ui/`-Ordner
4. Beachten Sie die Rollenbasierte Zugriffskontrolle

### Datenbankänderungen
1. Verwenden Sie das Migrations-Tool für alle Schema-Änderungen
2. Aktualisieren Sie entsprechende TypeScript-Typen
3. Beachten Sie RLS-Richtlinien bei neuen Tabellen
4. Testen Sie Änderungen mit verschiedenen Benutzerrollen

### Testing
- Unit-Tests für kritische Geschäftslogik
- Integration-Tests für Datenbankinteraktionen
- E2E-Tests für wichtige Benutzerflows
- Manuelle Tests mit verschiedenen Rollen

## 📄 Projektinformationen

**Lovable Project URL**: https://lovable.dev/projects/8110383a-490b-41a2-a38b-aaf123d0b0d7

### Technologien
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Supabase

### Deployment
Besuchen Sie [Lovable](https://lovable.dev/projects/8110383a-490b-41a2-a38b-aaf123d0b0d7) und klicken Sie auf Share → Publish.

---

*Dieses Projekt wurde mit Liebe für moderne Requirements Engineering Teams entwickelt.* 💙
