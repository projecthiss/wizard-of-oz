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
                    <br/>
                    Folgendermaßen können Sie das System benutzen:
                    <br/>
                    <ol>
                        <li>
                            Sie erhalten ganz oben eine neue Anfrage und eine entsprechende Problembeschreibung, die
                            bereits durch das System vormarkiert wird.
                        </li>
                        <li>
                            Auf Basis der Vormarkierung erhalten bereits drei Empfehlungen, die Sie bitte mit Sternen
                            bewerten. (0 Sterne = überhaupt nicht hilfreich; 5 Sterne = total hilfreich)
                        </li>
                        <li> Nun werden Sie gebeten die Markierung anzupassen. Markieren Sie hierzu die gewünschten
                            Stellen mit ihrer Maus oder Finger und wählen Sie eine entsprechende Kategorie.
                        </li>
                        <li>
                            Anschließend drücken Sie auf „….“, um drei neue Empfehlungen zu erhalten.
                        </li>
                        <li>Bewerten Sie die Empfehlungen erneut mit Sternen.
                        </li>
                        <li>
                            Wählen Sie die Lösung aus, die Sie für die Problemstellung verwendet hätten.
                        </li>
                    </ol>
                </Typography>
            </div>
        )
    }
}

export default Description;