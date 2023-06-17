# "ARlebnispfade OBK" - Location-Based AR Tracking

Dieses Repository enthält den Code für den im Rahmen des Praxisprojektes erstellten Prototypen zur Darstellung von AR-Inhalten im Web.

Die Funktionen sind für die Interaktion auf mobilen Endgeräten ausgelegt, können aber auch eingeschränlt auf dem Desktop aufgerufen werden.

Der Prototyp kann unter https://arlebnispfad-location.vercel.app/
oder unter folgendem QR-Code aufgerufen werden:

<img src="docs/qr-code.png" alt="QR-Code" width="200"/>

# Problemfeld

Im Rahmen des Projekts "Historische Augment Reality Tour 'ARlebnis OBK'" der VHS Oberberg soll entlang der Straße der Arbeit in Wiehl und Wipperfürth ein innovatives Konzept zur digitalen Weiterbildung mittels Augmented Reality (AR) entwickelt werden. Es sollen ältere, nicht technikaffine Menschen sowie jüngere, technikaffine Menschen als auch Schulklassen gleichermaßen an neue Technologien herangeführt und ihnen gleichzeitig der Zugang zur Geschichte und Kultur ihrer Region ermöglicht werden. Der Fokus des Vorhabens liegt somit in der Förderung einer generationenübergreifenden, inklusiven und nachhaltigen Strategie zur digitalen Weiterbildung.

# Prototyp

Der Prototyp zeigt die Möglichkeiten zur Einbindung von Audio-Inhalten an AR-Spots mittels [AR.js](https://github.com/AR-js-org/AR.js) und [A-Frame](https://aframe.io/) auf.

### `/index.html`

Die `index.html` dient als Startseite und Einstiegspunkt in den Prototypen. Hier können verschiedene AR-Spots hinzugefügt und ausgewählt werden.

### `/pages/th-koeln`

Im `pages` Verzeichnis werden die jeweiligen AR-Spots definiert und über eigene Ordner eingebunden. Als Beispiel wurde hier der AR-Spot der TH Köln gewählt.

### `/pages/th-koeln/index.html`

Die `index.html` Datei enthält die AR-Szene, die über die `a-scene` Komponente definiert wird und die wichtigsten Einstellungen enthält. Zudem wird hier der 2D-/Webcontent definiert, welcher die Informationen zum AR-Spot enthält und als Interaktionsschnittstelle für die Audioinhalte dient.

### `/pages/th-koeln/data.json`

Zur Verknüpfung der Geodaten mit den AR-Inhalten wird das [GeoJSON Format (RFC 7946)](https://datatracker.ietf.org/doc/html/rfc7946) verwendet. Dieses ermöglicht eine einheitliche Einbindung der Koordinaten.

Beispiel:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Mensa",
        "audio": "mensa",
        "description": "Die Mensa der Technischen Hochschule Köln am Campus Gummersbach ist ein lebendiger Treffpunkt für Studierende und Mitarbeiter. Hier werden köstliche Mahlzeiten und Snacks serviert, die den Gaumen verwöhnen und die Energie für den Studienalltag liefern. Die Mensa schafft eine angenehme Atmosphäre, in der sich Menschen treffen, austauschen und gemeinsam eine kulinarische Erfahrung genießen können."
      },
      "geometry": {
        "coordinates": [7.562724725621337, 51.02231978624965],
        "type": "Point"
      },
      "id": 0
    }
  ]
}
```

### `/pages/th-koeln/scripts/index.js`

Die `index.js` Datei enthält die Logik zur Einbindung der AR-Inhalte. Hier werden die Geodaten aus der `data.json` Datei ausgelesen und die AR-Spots anhand der Koordinaten in der Umgebung platziert. Zudem werden die Audioinhalte geladen und die Interaktionsschnittstelle definiert.

### `/pages/th-koeln/scripts/components`

Das `components` Verzeichnis enthält die Komponenten, die für die A-Frame Entitäten verwendet werden.
Die Komponente `clicker.js` implementiert z.B. den Click-Handler für die jeweiligen Entitäten.

### `/pages/th-koeln/assets`

Das `assets` Verzeichnis enthält die Audioinhalte, die an den AR-Spots abgespielt werden sollen.

Die Inhalte in diesem Prototypen wurden mit Hilfe von [OpenAIs ChatGTP](https://chat.openai.com/) als Text generiert und über [veed.io's Text-to-Speech](https://www.veed.io/) in Audioinhalte überführt.

# Proof of Concepts

Folgende Proof of Concepts wurden im Rahmen des Projekts erstellt und durchgeführt:

- [PoC: Interaktion mit Audiowiedergabe #1](https://github.com/antonztsv/arlebnispfad-location/issues/1)
- [PoC: Räumliche Audiowiedergabe #2](https://github.com/antonztsv/arlebnispfad-location/issues/2)
- [PoC: Interaktion mit AR Inhalten #3](https://github.com/antonztsv/arlebnispfad-location/issues/3)

# Bugs & Probleme

Aktuelle Bugs und Probleme sind unter [Known Issues / Bugs / Open Questions #4](https://github.com/antonztsv/arlebnispfad-location/issues/4) zu finden.

# Kontakt

Anton Zaitsev - [anton.zaitsev@smail.th-koeln.de](mailto:anton.zaitsev@smail.th-koeln.de)
