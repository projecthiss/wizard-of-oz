import React from "react";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import {Avatar, ButtonBase, Card, CardHeader, Typography} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

class TicketDisplay extends React.Component {


    render() {
        return (
            <div>
                {this.props.openTicket === null ? "No Content" :
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12}>
                                    <Typography align='left' sx={{color: 'text.secondary', margin: 0}}>
                                        {this.props.openTicket.ticketId}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant='subtitle1' sx={{fontWeight: '500'}} align='left'>
                                        {this.props.openTicket.ticketTitle}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography sx={{color: 'text.secondary'}} align='left'>
                                        {this.props.openTicket.ticketDate}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Typography align='left'>
                                        Ersteller: {this.props.openTicket.ticketCreator}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <div id='textField'>
                                        <Typography whiteSpace="pre-wrap" align={"left"}
                                                    dangerouslySetInnerHTML={{__html: this.props.highlightedHTML}}>
                                        </Typography>
                                    </div>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Grid container spacing={0.5}>
                                {this.props.highlightingCategories.map((item, index) =>

                                    <Grid key={index} item xs={6} md={12}>
                                        <Card variant='outlined' sx={{textAlign: 'left'}}>
                                            {this.props.highlightingEnabled ? <ButtonBase onClick={() => {
                                                    this.props.editHighlighting(item.name)
                                                }} sx={{justifyContent: 'flex-start'}}>

                                                    <CardHeader sx={{padding: 0.5, justifySelf: 'flex-start'}}
                                                                avatar={
                                                                    <Avatar sx={{bgcolor: item.color}}
                                                                            aria-label={item.name}>
                                                                        &nbsp;
                                                                    </Avatar>
                                                                }
                                                                title={item.name}
                                                    />
                                                </ButtonBase> :
                                                <CardHeader sx={{padding: 0.5, justifySelf: 'flex-start'}}
                                                            avatar={
                                                                <Avatar sx={{bgcolor: item.color}}
                                                                        aria-label={item.name}>
                                                                    &nbsp;
                                                                </Avatar>
                                                            }
                                                            title={item.name}
                                                />}

                                        </Card>
                                    </Grid>
                                )}
                                {this.props.highlightingEnabled ? <>
                                        <Grid  item xs={6} md={12}>
                                            <Card variant='outlined' sx={{textAlign: 'left'}}>
                                                <ButtonBase onClick={() => {
                                                    this.props.editHighlighting('clear')
                                                }} sx={{justifyContent: 'flex-start'}}>

                                                    <CardHeader sx={{padding: 0.5, justifySelf: 'flex-start'}}
                                                                avatar={
                                                                    <Avatar sx={{bgcolor: 'grey'}} aria-label={'clear'}>
                                                                        <FiberManualRecordIcon style={{color: "white"}}/>
                                                                    </Avatar>
                                                                }
                                                                title={'Highlighting entfernen'}
                                                    />
                                                </ButtonBase>
                                            </Card>
                                        </Grid>
                                        <Grid  item xs={6} md={12}>
                                            <Card variant='outlined' sx={{textAlign: 'left'}}>
                                                <ButtonBase onClick={() => {
                                                    this.props.clearAllHighlighting()
                                                }} sx={{justifyContent: 'flex-start'}}>
                                                    <CardHeader sx={{padding: 0.5, justifySelf: 'flex-start'}}
                                                                avatar={
                                                                    <Avatar sx={{bgcolor: '#c7c7c7'}} aria-label={'clear'}>
                                                                    <HighlightOffIcon/>
                                                                    </Avatar>
                                                                }
                                                                title={'Gesamte Highlighting entfernen'}
                                                    />
                                                </ButtonBase>
                                            </Card></Grid></>
                                    : <></>}
                            </Grid>
                        </Grid>
                    </Grid>}

            </div>
        )
    }
}

TicketDisplay.propTypes = {
    highlightingCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
    editHighlighting: PropTypes.func.isRequired,
    openTicket: PropTypes.object.isRequired,
    highlightingEnabled: PropTypes.bool.isRequired,
    highlightedHTML: PropTypes.string.isRequired,
    clearAllHighlighting: PropTypes.func.isRequired,

}
export default TicketDisplay;