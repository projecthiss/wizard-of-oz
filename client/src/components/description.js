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
                    Introduction
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Imagine yourself in the role of an IT support staff member. You receive numerous technical issues or inquiries from your customers or colleagues who are experiencing problems with their IT on a daily basis. Finding solutions proves to be very time-consuming, and you are struggling to keep up with the workload. You can apply the following AI-based recommendation system to assist you. It will provide you with recommendations from previously solved cases and enable you to find solutions.
                    <br/>
                    Here's how you can use the system:
                    <br/>
                    <ol>
                        <li>
                            At the top, you will receive a new request along with a corresponding problem description, which is already pre-marked by the system.
                        </li>
                        <li>
                            Based on the pre-marking, you will receive three recommendations, which you should rate <b>all</b> with stars (0 stars = not helpful at all; 5 stars = very helpful).
                        </li>
                        <li>
                            You will then be asked to adjust the marking. To do this, use your mouse or finger to highlight the desired areas and select an appropriate category.
                        </li>
                        <li>
                            Afterward, press "Generate AI-based Recommendation based on Highlighting" to receive three new recommendations.
                        </li>
                        <li>Re-rate <b>all</b> recommendations with stars (0 stars = not helpful at all; 5 stars = very helpful).
                        </li>
                        <li>
                            Finally, select the solution you would have used for the problem by clicking on circular buttons on the left side.
                        </li>
                    </ol>
                    <br/>
                    More Tips & Hints:
                    <br/>
                    <ul>
                        <li>
                            Not every word in the problem description needs to be marked. Only highlight relevant areas.
                        </li>
                        <li>
                            Click on the recommended tickets to access the solution description and fictitiously solve the problem.
                        </li>
                    </ul>
                    <br/>
                    The following categories should be correctly marked during the course of the experiment:
                    <br/>
                    <ul>
                        <li>
                            <b>System: </b> What software or hardware is involved? Example: "Microsoft Word"
                        </li>
                        <li>
                            <b>Error Description: </b> What is the specific description of the error? Example: "won't start anymore"
                        </li>
                        <li>
                            <b>Trigger: </b> What could be the cause of the problem? Example: "after an update"
                        </li>
                        <li>
                            <b>Service Request: </b> What needs to be done from the customer's perspective? Example: "set up a new account"
                        </li>
                        <li>
                            <b>Additional Information: </b> What useful information does the problem description contain beyond the above-mentioned categories? Example: "Version 1.5"
                        </li>
                    </ul>
                
                    Thank you for your participation!

                </Typography>
            </div>
        )
    }
}

export default Description;
 /* br/>
                    Bei Fragen wenden Sie sich bitte an <a href= "philipp.reinhard@uni-kassel.de">philipp.reinhard@uni-kassel.de</a>
                     <br/>*/