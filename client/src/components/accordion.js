import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from "prop-types";
import {Divider, Grid, Rating} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


class ControlledAccordions extends React.Component {
    constructor(props) {
        super(props);
        let falseItems = []

        if (this.props.solutionTickets !== null) {
            for (let n = 0; n < props.solutionTickets.length; n++) {
                falseItems.push(false)
            }
        }
        this.state = {
            expanded: falseItems,
        }
    }


    changeExpanded = (position) => {
        let expanded = this.state.expanded
        expanded[position] = !expanded[position]
        this.setState({expanded: expanded})
    }

    render() {
        return (
            <div key={this.props.solutionTickets}>
                <Typography variant='h6' sx={{fontWeight: 'normal', margin: 2}} align='left'>
                    Recommended tickets
                </Typography>

                        {this.props.solutionTickets.map((item, position) =>
                            <Accordion key={position}
                                       expanded={this.state.expanded[position] === undefined ? false : this.state.expanded[position]}
                                       onChange={() => {
                                           this.changeExpanded(position)
                                       }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Grid container>
                                        <Grid item xs={12} md={1} align='left'>
                                            <Typography sx={{color: 'text.secondary'}}>
                                                <Radio
                                                    checked={this.props.bestTicket === item.ticketId}
                                                    onChange={()=>{this.props.setBestTicket(item.ticketId)}}
                                                    value={item.ticketId}
                                                    name={item.ticketId}
                                                    inputProps={{ 'aria-label': item.ticketId }}
                                                    label={item.ticketId}
                                                />

                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Typography variant='subtitle1' sx={{fontWeight: '500'}} align='left'>
                                                {item.ticketTitle}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={4} md={2} align='left'>
                                            <Typography sx={{color: 'text.secondary'}}>
                                                {item.ticketDate}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} md={2}>
                                            <Typography align='left'>
                                                Agent: {item.ticketCreator}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4} md={1}>
                                            <Rating
                                                align='left'
                                                value={this.props.solutionFeedback[position]}
                                                onChange={(event, newValue) => {
                                                    this.props.updateFeedBackValue(position, newValue)
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Divider sx={{marginBottom: 2}}/>
                                    <Typography variant='subtitle1' sx={{fontWeight: '500'}} align="left">
                                        Problem description
                                    </Typography>
                                    <Typography whiteSpace="pre-wrap" align={"left"}
                                                dangerouslySetInnerHTML={{__html: item.highlightedHTML}}>
                                    </Typography>
                                    <Divider sx={{margin: 2}}/>
                                    <Typography variant='subtitle1' sx={{fontWeight: '500'}} align="left">
                                        Solution history
                                    </Typography>
                                    <Typography align="left"
                                                dangerouslySetInnerHTML={{__html: item.ticketSolutionHistory.replaceAll('\r\n', '<br>')}}>
                                    </Typography>
                                    <Typography>

                                    </Typography>
                                </AccordionDetails>
                            </Accordion>)}
            </div>
        );
    }


}

ControlledAccordions.propTypes = {
    solutionTickets: PropTypes.arrayOf(PropTypes.object).isRequired,
    solutionFeedback: PropTypes.arrayOf(PropTypes.number).isRequired,
    updateFeedBackValue: PropTypes.func.isRequired,
    setBestTicket: PropTypes.func.isRequired,
    bestTicket: PropTypes.any.isRequired,
}

export default ControlledAccordions;