import React from "react";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import {Avatar, ButtonBase, Card, CardHeader, Typography} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

class Description extends React.Component {


    render() {
        return (
            <div>
                <br/>
                <Typography variant="h4" gutterBottom>
                    Einführung
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Versetzen Sie sich in die Rolle eines IT Support Mitarbeitenden. Sie bekommen täglich zahlreiche
                    technische Problemstellungen oder Anfragen von Ihren Kunden bzw. Arbeitskollegen, die Probleme mit
                    ihrer IT haben. Die Suche nach Lösungen erweist sich als sehr aufwendig und mit dem Bearbeiten
                    kommen Sie nur langsam hinterher. Sie können das folgende auf künstlicher Intelligenz basierte
                    Empfehlungssystem anwenden. Damit werden Ihnen aus bereits gelösten Fällen Empfehlungen geliefert
                    und es wird Ihnen ermöglicht, Lösungswege zu finden.
                    <br/>
                    Folgendermaßen können Sie das System benutzen:
                    <br/>
                    <ol>
                        <li>
                            Sie erhalten ganz oben eine neue Anfrage und eine entsprechende Problembeschreibung, die
                            bereits durch das System vormarkiert wird.
                        </li>
                        <li>
                            Auf Basis der Vormarkierung erhalten bereits drei Empfehlungen, die Sie bitte <b>alle</b> mit Sternen
                            bewerten. (0 Sterne = überhaupt nicht hilfreich; 5 Sterne = total hilfreich)
                        </li>
                        <li> Nun werden Sie gebeten die Markierung anzupassen. Markieren Sie hierzu die gewünschten
                            Stellen mit ihrer Maus oder Finger und wählen Sie eine entsprechende Kategorie.
                        </li>
                        <li>
                            Anschließend drücken Sie auf „Generiere Empfehlung durch KI-basierend auf dem Highlighting“, um drei neue Empfehlungen zu erhalten.
                        </li>
                        <li>Bewerten Sie <b>alle</b> Empfehlungen erneut mit Sternen (0 Sterne = überhaupt nicht hilfreich; 5 Sterne = total hilfreich).
                        </li>
                        <li>
                            Wählen Sie schließlich die Lösung aus, die Sie für die Problemstellung verwendet hätten. Dafür klicken Sie auf kreisförmigen Buttons auf der linken Seite.
                        </li>
                    </ol>
                    <br/>
                    Weitere Tipps & Hinweise:
                    <br/>
                    <ul>
                        <li>
                            Nicht jedes Wort in der Problembeschreibung muss markiert werden. Markieren sie nur relevante Stellen.
                        </li>
                        <li>
                            Klicke auf die empfohlenen Tickets, um zur Lösungsbeschreibung zu gelangen und das Problem fiktiv zu lösen
                        </li>
                    </ul>
                    <br/>
                    Folgende Kategorien sollen im Laufe des Experiments korrekt markiert werden:
                    <br/>
                    <ul>
                        <li>
                            <b>System: </b> Um welche Software oder Hardware handelt es sich? Beispiel: "Microsoft Word"
                        </li>
                        <li>
                            <b>Fehlerbeschreibung: </b> Wie lautet die konkrete Beschreibung des Fehlers? Beispiel: "startet nicht mehr"
                        </li>
                        <li>
                            <b>Auslöser: </b> Was könnte die Ursache für das Problem sein? Beispiel: "nach einem Update"
                        </li>
                        <li>
                            <b>Service Anfrage: </b> Was soll aus sich des Kunden gemacht werden? Beispiel: "einen neuen Account einrichten" 
                        </li>
                        <li>
                            <b>Sonstiges: </b> Welches nützlichen Informationen enthält die Problembeschreibung über die oben genannten Kategorien hinaus? Beispiel: "Version 1.5"
                        </li>
                    </ul>
                    <br/>
                    Bei Fragen wenden Sie sich bitte an <a href= "philipp.reinhard@uni-kassel.de">philipp.reinhard@uni-kassel.de</a>
                    <br/>
                    Vielen Dank für Ihre Teilnahme!


                </Typography>
            </div>
        )
    }
}

export default Description;