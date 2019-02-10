import React from "react";
import AccountForm from "./AccountForm";
import SocialForm from "./SocialForm";
import PersonalDetailsForm from "./PersonalDetailsForm";
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";

const styles = theme => ({
	appBar: {
		position: "relative"
	},
	layout: {
		width: "auto",
		marginLeft: theme.spacing.unit * 2,
		marginRight: theme.spacing.unit * 2,
		[theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
			width: 600,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 3,
		padding: theme.spacing.unit * 2,
		[theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
			marginTop: theme.spacing.unit * 6,
			marginBottom: theme.spacing.unit * 6,
			padding: theme.spacing.unit * 3
		}
	},
	stepper: {
		padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
	},
	buttons: {
		display: "flex",
		justifyContent: "flex-end"
	},
	button: {
		marginTop: theme.spacing.unit * 3,
		marginLeft: theme.spacing.unit
	}
});

const steps = ["Account", "Social", "Personal"];

function getStepContent(step) {
	switch (step) {
		case 0:
			return <AccountForm />;
		case 1:
			return <SocialForm />;
		case 2:
			return <PersonalDetailsForm />;
		default:
			throw new Error("Unknown step");
	}
}

class Form extends React.Component {
	state = {
		activeStep: 0
	};

	handleNext = () => {
		this.setState(state => ({
			activeStep: state.activeStep + 1
		}));
	};

	handleBack = () => {
		this.setState(state => ({
			activeStep: state.activeStep - 1
		}));
	};

	handleReset = () => {
		this.setState({
			activeStep: 0
		});
	};

	render() {
		const { classes } = this.props;
		const { activeStep } = this.state;

		return (
			<React.Fragment>
				<AppBar position="absolute" color="default" className={classes.appBar}>
					<Toolbar>
						<Typography variant="h6" color="inherit">
							React Material-UI Form
						</Typography>
					</Toolbar>
				</AppBar>
				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography component="h1" variant="h4" align="center">
							Register
						</Typography>
						<Stepper activeStep={activeStep} className={classes.stepper}>
							{steps.map(label => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>

						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography variant="h5" gutterBottom>
									Welcome!
								</Typography>
								<Typography variant="subtitle1">
									Thank you for taking the time to register. We hope you enjoy our community!
								</Typography>
							</React.Fragment>
						) : (
							<React.Fragment>
								{getStepContent(activeStep)}
								<div className={classes.buttons}>
									{activeStep !== 0 && (
										<Button
											onClick={this.handleBack}
											variant="outlined"
											className={classes.button}>
											Back
										</Button>
									)}
									<Button
										variant="contained"
										color="secondary"
										onClick={this.handleNext}
										className={classes.button}>
										{activeStep === steps.length - 1 ? "Submit" : "Next"}
									</Button>
								</div>
							</React.Fragment>
						)}
					</Paper>
				</main>
			</React.Fragment>
		);
	}
}

export default withStyles(styles)(Form);
