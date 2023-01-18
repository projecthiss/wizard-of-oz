import React from "react";
import './App.css';
import * as dfd from "danfojs"
import Cookies from 'universal-cookie';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {Container} from "@mui/material";
import ControlledAccordions from "./components/accordion";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box'
import TicketDisplay from "./components/ticketDisplay";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {wait} from "@testing-library/user-event/dist/utils";
import Description from "./components/description";


const highlightingPath = 'bandit-artificial-intelligence-hiss'
const controlGroupPath = 'hiss-artificial-intelligence-bandit'
const highlightingPath_PRE_recommendation = 'artificial-intelligence-bandit-hiss'

const editingVideo = 'https://www.youtube.com/embed/uCyp5IKjrxU'
const noEditingVideo = "https://www.youtube.com/embed/52Gg9CqhbP8"

const surveyLink = "https://docs.google.com/forms/d/1ln8NSvBwaaIZLgJUG0CfS7dXHD5ChQRXBSQ2Hporo4M/edit"

function appBarLabel(label) {
    return (

        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" sx={{marginBottom: 4}}>
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{flexGrow: 0}}>
                        {label}
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box>
    );
}


const cookies = new Cookies('HEADER');
/*
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}*/

const highlightingCategories = [
    {name: 'Fehlerbeschreibung', color: '#D66C85'},
    {name: 'System', color: '#2F97FF'},
    {name: 'Auslöser', color: '#FFD03B'},
    {name: 'Service Anfrage', color: '#9FDB91'},
    {name: 'Sonstiges', color: '#BDBDBD'}]
const getColorForKey = (key) => {
    for (let a of highlightingCategories) {
        if (a.name === key) {
            return a.color
        }

    }

    throw new Error("notFound")
}

class App extends React.Component {

    constructor(props) {
        super(props);
        console.log(window.location.pathname)
        let groupName = window.location.pathname.split('/')[1]
        console.log(groupName)
        let error = false

        if ((groupName !== highlightingPath && groupName !== controlGroupPath && groupName !== highlightingPath_PRE_recommendation) ||
            window.location.pathname.split('/')[2] === undefined || window.location.pathname.split('/')[2] === '') {
            error = true
            console.log("ERROR")
        }

        const highlightingEnabled = groupName === highlightingPath || groupName === highlightingPath_PRE_recommendation
        const preSolution = groupName === highlightingPath_PRE_recommendation

        //read position from cookie
        this.state = {
            error: error,
            usercode: window.location.pathname.split('/')[2],
            highlightingEnabled: highlightingEnabled,
            currentTicket: null,
            openTicketsDf: {},
            solutionTicketsDf: null,
            maxTicketNumber: null,
            openTicket: {},
            preSolutionTickets: [],
            solutionTickets: [],
            loading: false,
            solutionFeedback: [0, 0, 0],
            preSolutionFeedback: [0, 0, 0],

            preSolution: preSolution,
            bestTicket: null,
            bestPreTicket: null,
        };

    }

    async componentDidMount() {
        let currentTicket = parseInt(cookies.get('HISS-WIZARD-OF-OZ_CURRENT_TICKET'))
        if (isNaN(currentTicket)) {
            const tomorrow = new Date();
            tomorrow.setDate(new Date().getDate() + 7);
            cookies.set('HISS-WIZARD-OF-OZ_CURRENT_TICKET', -1, {path: '/', expires: tomorrow});
            currentTicket = -1
        }
        const openTicketsDf = await dfd.readExcel((window.location.protocol === 'https:' ? 'https:' : 'http:') + '//' + window.location.host + '/wizard_of_oz_experiment_data_open.xlsx')
        const solutionTicketsDf = await dfd.readExcel((window.location.protocol === 'https:' ? 'https:' : 'http:') + '//' + window.location.host + '/wizard_of_oz_experiment_data_solution.xlsx')

        if (currentTicket !== -1) {
            const openTicket = this.getOpenTickets(currentTicket, openTicketsDf)
            openTicket.ticketDescriptionHighlighting = JSON.parse(openTicket.ticketDescriptionHighlighting)

            const solutionTicket = this.getSolutionTicketByRow(openTicket, solutionTicketsDf,)
            const preSolutionTicket = this.getPreSolutionTicketByRow(openTicket, solutionTicketsDf,)

            this.setState({
                predictionState: true,
                currentTicket: currentTicket,
                openTicketsDf: openTicketsDf,
                solutionTicketsDf: solutionTicketsDf,
                maxTicketNumber: openTicketsDf.shape[0],
                openTicket: openTicket,
                solutionTickets: solutionTicket,
                preSolutionTickets: preSolutionTicket,
                highlightedHTML: this.getMarkup(openTicket)
            })
        } else {
            this.setState({
                predictionState: true,
                currentTicket: currentTicket,
                openTicketsDf: openTicketsDf,
                solutionTicketsDf: solutionTicketsDf,
                maxTicketNumber: openTicketsDf.shape[0],
            })
        }


    }


    getOpenTickets = (n, usedDf = this.state.openTicketsDf) => {
        console.log(n)
        console.log("hi")
        let rowObject = {}
        let row = dfd.toJSON(usedDf.loc({rows: usedDf['systemId'].eq(parseInt(n))}), {format: 'row'})
        console.log("Yeah")
        for (let key in row) {
            rowObject[key] = row[key][0]
        }

        return rowObject

    }
    getSolutionTicketByRow = (openTicket, usedDf = this.state.solutionTicketsDf,) => {

        let currentOpenTicket = openTicket
        let solutionTicketsArray = []
        const keys = ["solutionId1", "solutionId2", "solutionId3"]

        for (let key of keys) {
            let rowObject = {}
            let row = dfd.toJSON(usedDf.loc({rows: usedDf['systemId'].eq(parseInt(currentOpenTicket[key]))}), {format: 'row'})

            for (let item in row) {
                rowObject[item] = row[item][0]
            }
            rowObject.ticketDescriptionHighlighting = JSON.parse(rowObject.ticketDescriptionHighlighting)
            rowObject['highlightedHTML'] = this.getMarkup(rowObject)
            solutionTicketsArray.push(rowObject)
        }
        return solutionTicketsArray
    }

    getPreSolutionTicketByRow = (openTicket, usedDf = this.state.solutionTicketsDf,) => {

        let currentOpenTicket = openTicket
        let preSolutionTicketsArray = []
        const keys = ["pre_solutionId1", "pre_solutionId2", "pre_solutionId3"]

        for (let key of keys) {
            let rowObject = {}
            let row = dfd.toJSON(usedDf.loc({rows: usedDf['systemId'].eq(parseInt(currentOpenTicket[key]))}), {format: 'row'})

            for (let item in row) {
                rowObject[item] = row[item][0]
            }
            rowObject.ticketDescriptionHighlighting = JSON.parse(rowObject.ticketDescriptionHighlighting)
            rowObject['highlightedHTML'] = this.getMarkup(rowObject)
            preSolutionTicketsArray.push(rowObject)
        }
        return preSolutionTicketsArray
    }

    getPrediction = async () => {
        this.setState({loading: true}, async () => {
            await wait(1000)

            this.setState({loading: false, predictionState: false})
        })
    }
    setBestTicket = (value) => {
        console.log(value)
        console.log(typeof value)
        this.setState({bestTicket: value})
    }
    setPreBestTicket = (value) => {
        console.log(value)
        console.log(typeof value)
        this.setState({preBestTicket: value})
    }

    markUpAdd = (start, end, key) => {
        let allMarkUp = this.state.openTicket.ticketDescriptionHighlighting
        for (let a of allMarkUp) {
            if (a.start < start && a.end > end) {
                allMarkUp.push({start: end, end: a.end, key: a.key})
                a.end = start
            } else {
                if (a.start >= start && a.start < end) {
                    a.start = end
                }
                if (a.end >= start && a.end <= end) {
                    a.end = start
                }
            }

        }
        let i = 0
        while (i < allMarkUp.length) {
            if (allMarkUp[i].start > allMarkUp[i].end || allMarkUp[i].color === "clear") {
                allMarkUp.splice(i, 1);
                i--
            }
            i++

        }
        let d = this.state.openTicket
        if (key !== "clear") {
            allMarkUp.push({start: start, end: end, key: key})
        }

        d.ticketDescriptionHighlighting = allMarkUp
        console.log(allMarkUp)
        this.setState({openTicket: d, highlightedHTML: this.getMarkup(d)})


    }
    markUpSort = () => {
        this.state.openTicket.ticketDescriptionHighlighting.sort((a, b) => parseFloat(b.end) - parseFloat(a.end));
    }

    getCharactersCountUntilNode = (node, parent) => {
        var walker = document.createTreeWalker(
            parent || document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        var found = false;
        var chars = 0;
        while (walker.nextNode()) {
            if (walker.currentNode === node) {
                found = true;
                break;
            }
            chars += walker.currentNode.textContent.length;
        }
        if (found) {
            return chars;
        } else return -1;
    }

    markText = (key) => {
        if (this.state.predictionState) {

            let container = document.getElementById("textField")
            let sel = window.getSelection();
            if (sel.rangeCount !== 0) {

                let range = sel.getRangeAt(0);

                let sel_start = range.startOffset;
                let sel_end = range.endOffset;

                let charsBeforeStart = this.getCharactersCountUntilNode(range.startContainer, container);
                let charsBeforeEnd = this.getCharactersCountUntilNode(range.endContainer, container);
                if (charsBeforeStart < 0 || charsBeforeEnd < 0) {
                    console.warn('out of range');
                    return;
                }
                let start_index = charsBeforeStart + sel_start;
                let end_index = charsBeforeEnd + sel_end;
                //if (color!=="clear")
                this.markUpAdd(start_index, end_index, key)
                //}
            }
        } else {
            alert("Editieren des Highlightings nach einer Prediction nicht möglich")
        }
    }
    leaveIntro = async () => {
        const tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + 7);
        const currentTicket = parseInt(this.state.currentTicket) + 1
        if (currentTicket > this.state.maxTicketNumber) {
            alert("Finished")
            this.setState({loading: false})
            return
        }
        cookies.set('HISS-WIZARD-OF-OZ_CURRENT_TICKET', currentTicket, {path: '/', expires: tomorrow});
        const openTicket = this.getOpenTickets(currentTicket)
        openTicket.ticketDescriptionHighlighting = JSON.parse(openTicket.ticketDescriptionHighlighting)
        const solutionTicket = this.getSolutionTicketByRow(openTicket)
        const preSolutionTicket = this.getPreSolutionTicketByRow(openTicket)

        this.setState({
            predictionState: true,
            currentTicket: currentTicket,
            openTicket: openTicket,
            solutionTickets: solutionTicket,
            preSolutionTickets: preSolutionTicket,
            highlightedHTML: this.getMarkup(openTicket)
        })
    }
    nextTicket = () => {
        this.setState({loading: true}, () => {
            const tomorrow = new Date();
            tomorrow.setDate(new Date().getDate() + 7);
            const currentTicket = parseInt(this.state.currentTicket) + 1
            if (currentTicket > this.state.maxTicketNumber) {
                alert("Finished")
                this.setState({loading: false})
                return
            }
            console.log(this.state.openTicket)
            let feedback = {
                usercode: this.state.usercode,
                systemId: this.state.openTicket.systemId,
                ticketId: this.state.openTicket.ticketId,
                group: this.state.highlightingEnabled ? 'Editing' : 'NoEditing',
                givenHighlighting: this.state.openTicket.ticketDescriptionHighlighting,
                preSolutionGroup: this.state.preSolution,
                feedback: {
                    bestTicket: this.state.bestTicket,
                    preBestTicket: this.state.preBestTicket,
                    preSolutionId_one: this.state.preSolutionTickets[0].systemId,
                    preSolutionFeedback_one: this.state.preSolutionFeedback[0],
                    preSolutionId_two: this.state.preSolutionTickets[1].systemId,
                    preSolutionFeedback_two: this.state.preSolutionFeedback[1],
                    preSolutionId_three: this.state.preSolutionTickets[2].systemId,
                    preSolutionFeedback_three: this.state.preSolutionFeedback[2],
                    solutionId_one: this.state.solutionTickets[0].systemId,
                    solutionFeedback_one: this.state.solutionFeedback[0],
                    solutionId_two: this.state.solutionTickets[1].systemId,
                    solutionFeedback_two: this.state.solutionFeedback[1],
                    solutionId_three: this.state.solutionTickets[2].systemId,
                    solutionFeedback_three: this.state.solutionFeedback[2],
                }
            }
            console.log(this.state.solutionTickets)
            console.log(feedback)
            fetch('/api/feedbackToDatabase', {
                method: 'POST',
                body: JSON.stringify({feedback: feedback}),
            }).then((response) => {
                if (response.status !== 200) {
                    throw new Error('fail')
                }
            }).then(async (d) => {
                cookies.set('HISS-WIZARD-OF-OZ_CURRENT_TICKET', currentTicket, {path: '/', expires: tomorrow});
                const openTicket = this.getOpenTickets(currentTicket)
                openTicket.ticketDescriptionHighlighting = JSON.parse(openTicket.ticketDescriptionHighlighting)
                const solutionTicket = this.getSolutionTicketByRow(openTicket)
                const preSolutionTicket = this.getPreSolutionTicketByRow(openTicket)
                this.setState({
                    loading: false,
                    predictionState: true,
                    currentTicket: currentTicket,
                    openTicket: openTicket,
                    solutionTickets: solutionTicket,
                    preSolutionTickets: preSolutionTicket,
                    highlightedHTML: this.getMarkup(openTicket),
                    solutionFeedback: [0, 0, 0],
                    preSolutionFeedback: [0, 0, 0],
                    preBestTicket: null,
                    bestTicket: null,
                })
            }).catch((e) => {
                console.log(e)
                alert("Error saving your Feedback")
            })
        })
    }
    updateFeedback = (id, value) => {
        let solutionFeedback = this.state.solutionFeedback
        solutionFeedback[id] = value
        this.setState({solutionFeedback: solutionFeedback})
    }
    updatePreFeedback = (id, value) => {
        let preSolutionFeedback = this.state.preSolutionFeedback
        preSolutionFeedback[id] = value
        this.setState({preSolutionFeedback: preSolutionFeedback})
    }
    clearAllMarkUp = () => {
        if (window.confirm('Are you sure you want to clear all Highlighting?')) {
            // Save it!
            let ticket = this.state.openTicket
            ticket.ticketDescriptionHighlighting = []
            this.setState({openTicket: ticket, highlightedHTML: this.getMarkup(ticket)})
        }
    }

    getMarkup = (object) => {
        let textEdit = object.ticketDescription
        const highlightingCode = object.ticketDescriptionHighlighting.sort((a, b) => parseFloat(b.end) - parseFloat(a.end));
        const ticketTextArray = textEdit.split("\n")
        for (let a of highlightingCode) {
            let newStart = a.start
            let newEnd= a.end
            let c=0
            let lines=0
            for (const e of ticketTextArray){
                c += e.length
                if (c>=newStart) {
                    newStart += lines
                    break
                }
                lines++
            }
            c=0
            lines=0
            for (const e of ticketTextArray){
                c += e.length
                if (c>=newEnd) {
                    newEnd += lines
                    break
                }
                lines++
            }
            textEdit = [textEdit.slice(0, newEnd), "</span>", textEdit.slice(newEnd)].join('');
            textEdit = [textEdit.slice(0, newStart), "<span style='background-color: " + getColorForKey(a.key) + "'>", textEdit.slice(newStart)].join('');
        }
        return textEdit
    }


    render() {
        return (
            <div className="App">
                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={this.state.loading}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {this.state.error ? "Please use the correct URL provided to you." :
                    <div>
                        {this.state.currentTicket === -1 ? <>
                                <Container component="main" maxWidth="lg">


                                    <Grid container spacing={2}>

                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="flex-start" textAlign={"left"}>
                                                <Description/>
                                                {/*
                                                <iframe
                                                    src={this.state.highlightingEnabled ? editingVideo : noEditingVideo}
                                                    title="Intro Video" frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen></iframe>*/}
                                            </Box>
                                        </Grid>


                                        <Grid item xs={12}>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Button variant="contained" endIcon={<SendIcon/>}
                                                        onClick={this.leaveIntro}>
                                                    Nimm an der Studie teil
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </> :
                            <>
                                {appBarLabel('HISS - KI basierte Lösungsempfehlung')}

                                <Container component="main" maxWidth="lg">


                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TicketDisplay openTicket={this.state.openTicket}
                                                           highlightingCategories={highlightingCategories}
                                                           editHighlighting={this.markText}
                                                           highlightingEnabled={this.state.highlightingEnabled}
                                                           highlightedHTML={this.state.highlightedHTML}
                                                           clearAllHighlighting={this.clearAllMarkUp}

                                            />


                                        </Grid>
                                        <Grid item xs={12}>
                                            {this.state.predictionState ?
                                                <Box display="flex" justifyContent="flex-start">
                                                    {this.state.currentTicket === this.state.maxTicketNumber - 1 ? <>
                                                            <Button href={surveyLink} variant="contained">
                                                                Zur Befragung
                                                            </Button>
                                                        </> :
                                                        <Button variant="contained" endIcon={<SendIcon/>}
                                                                onClick={this.getPrediction}>
                                                            Generiere Empfehlung durch KI Basierend auf dem Highlighting
                                                        </Button>}
                                                </Box> : <Box display="flex" justifyContent="flex-end">
                                                    <Button variant="contained" endIcon={<SendIcon/>}
                                                            onClick={this.nextTicket}>
                                                        Zum nächsten Ticket
                                                    </Button>
                                                </Box>}
                                        </Grid>
                                        {!this.state.predictionState ?
                                            <Grid item xs={12}>
                                                <ControlledAccordions updateFeedBackValue={this.updateFeedback}
                                                                      solutionTickets={this.state.solutionTickets}
                                                                      solutionFeedback={this.state.solutionFeedback}
                                                                      bestTicket={this.state.bestTicket}
                                                                      setBestTicket={this.setBestTicket}/>
                                            </Grid> :
                                            <>
                                                {this.state.preSolution && this.state.currentTicket !== this.state.maxTicketNumber - 1 ?
                                                    <Grid item xs={12}>
                                                        <ControlledAccordions
                                                            updateFeedBackValue={this.updatePreFeedback}
                                                            solutionTickets={this.state.preSolutionTickets}
                                                            solutionFeedback={this.state.preSolutionFeedback}
                                                            bestTicket={this.state.preBestTicket}
                                                            setBestTicket={this.setPreBestTicket}/>
                                                    </Grid> :
                                                    <>
                                                    </>}
                                            </>}
                                    </Grid>
                                    {/*<Copyright sx={{mt: 8, mb: 4}}/>*/}
                                </Container>
                            </>}
                    </div>
                }

            </div>
        );
    }


}

export default App;