// @flow
import * as React from "react";
import axios from "axios";
import {useStyles} from "./styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RatingComponent from "material-ui-rating";
import TextField from "@material-ui/core/TextField";
import Condition from "../HOC/Condition";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Redirect, withRouter} from "react-router";

type Properties = {
    id: ?number,
    history: {}
};

function getSteps() {
    return ["Создание оценки", "Запись на прием к врачу", "Приема у врача", "Оценка приема"];
}

const Rating = ({id, history}: Properties): React.Node => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [diagnosisId, setDiagnosisId] = React.useState(0);
    const [symptoms, setSymptoms] = React.useState("");
    const [polyclinicId, setPolyclinicId] = React.useState(0);
    const [appointmentTypeId, setAppointmentTypeId] = React.useState(0);
    const [appointmentId, setAppointmentId] = React.useState("");
    const [appointmentDate, setAppointmentDate] = React.useState("");
    const [medicTypeId, setMedicTypeId] = React.useState(0);
    const [appointmentDateActual, setAppointmentDateActual] = React.useState("");
    const [medicName, setMedicName] = React.useState("");
    const [temperature, setTemperature] = React.useState(false);
    const [bloodPressure, setBloodPressure] = React.useState(false);
    const [inspection, setInspection] = React.useState(false);
    const [technicalState, setTechnicalState] = React.useState(0);
    const [politeness, setPoliteness] = React.useState(0);
    const [neatness, setNeatness] = React.useState(0);
    const steps = getSteps();

    function handleNext() {
        if (activeStep === 3) {
            axios.post("http://tomcat.rs-soft.site/hackathon-app-1.0-SNAPSHOT/step", {
                userId: 1,
                stepOne: {
                    diagnosisId,
                    symptoms,
                    polyclinicId
                },
                stepTwo: {
                    appointmentTypeId,
                    appointmentId,
                    appointmentDate,
                    medicTypeId
                },
                stepThree: {
                    appointmentDateActual,
                    medicName,
                    meta: {
                        temperature,
                        bloodPressure,
                        inspection
                    }
                },
                stepFour: {
                    technicalState,
                    politeness,
                    neatness
                }
            }).finally(() => {
                history.push("/");
            })
        }
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Condition match={index === 0}>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <TextField id="diagnosisId"
                                               label="Предполагаемый диагноз"
                                               select
                                               value={diagnosisId}
                                               onChange={(event) => setDiagnosisId(event.target.value)}
                                               margin="normal">
                                        <MenuItem value={0}>Не выбрано</MenuItem>
                                        <MenuItem value={1}>ОРЗ/ОРВ</MenuItem>
                                    </TextField>
                                    <TextField id="symptoms"
                                               label="Симптомы"
                                               value={symptoms}
                                               onChange={(event) => setSymptoms(event.target.value)}
                                               margin="normal"/>
                                    <TextField id="polyclinicId"
                                               label="Медицинское учреждение"
                                               select
                                               value={polyclinicId}
                                               onChange={(event) => setPolyclinicId(event.target.value)}
                                               margin="normal">
                                        <MenuItem value={0}>Не выбрано</MenuItem>
                                        <MenuItem value={5}>ГБУЗ РК Симферопольская поликлиника № 4</MenuItem>
                                        <MenuItem value={6}>ГБУЗ РК Поликлиника № 3</MenuItem>
                                    </TextField>
                                </div>
                            </Condition>
                            <Condition match={index === 1}>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <TextField id="appointmentTypeId"
                                               label="Способ записи"
                                               select
                                               value={appointmentTypeId}
                                               onChange={(event) => setAppointmentTypeId(event.target.value)}
                                               margin="normal">
                                        <MenuItem value={0}>Не выбрано</MenuItem>
                                        <MenuItem value={1}>Регистратра</MenuItem>
                                    </TextField>
                                    <TextField id="appointmentId"
                                               label="Номер записи"
                                               value={appointmentId}
                                               onChange={(event) => setAppointmentId(event.target.value)}
                                               margin="normal"/>
                                    <TextField id="appointmentDate"
                                               label="Время записи"
                                               margin="normal"
                                               type="datetime-local"
                                               value={appointmentDate}
                                               onChange={(event) => setAppointmentDate(event.target.value)}
                                               InputLabelProps={{
                                                   shrink: true,
                                               }}/>
                                    <TextField id="medicType"
                                               label="Тип специалиста"
                                               select
                                               value={medicTypeId}
                                               onChange={(event) => setMedicTypeId(event.target.value)}
                                               margin="normal">
                                        <MenuItem value={0}>Не выбрано</MenuItem>
                                        <MenuItem value={1}>Терапевт</MenuItem>
                                    </TextField>
                                </div>
                            </Condition>
                            <Condition match={index === 2}>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <TextField id="appointmentDateActual"
                                               label="Фактическое время приема"
                                               margin="normal"
                                               type="datetime-local"
                                               value={appointmentDateActual}
                                               onChange={(event) => setAppointmentDateActual(event.target.value)}
                                               InputLabelProps={{
                                                   shrink: true,
                                               }}/>
                                    <TextField id="medicTypeActual"
                                               label="ФИО специалиста"
                                               value={medicName}
                                               onChange={(event) => setMedicName(event.target.value)}
                                               margin="normal"/>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={temperature}
                                                onChange={(event) => setTemperature(event.target.checked)}
                                                value="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Измерение температуры"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={bloodPressure}
                                                onChange={(event) => setBloodPressure(event.target.checked)}
                                                value="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Измерение кровяного давления"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={inspection}
                                                onChange={(event) => setInspection(event.target.checked)}
                                                value="checkedB"
                                                color="primary"
                                            />
                                        }
                                        label="Общий осмотр"
                                    />
                                </div>
                            </Condition>
                            <Condition match={index === 3}>
                                <div>
                                    <div>
                                        <Typography>Техническое состояние помещения</Typography>
                                        <RatingComponent value={technicalState} max={5} onChange={setTechnicalState}/>
                                    </div>
                                    <div>
                                        <Typography>Вежливость персонала</Typography>
                                        <RatingComponent value={politeness} max={5} onChange={setPoliteness}/>
                                    </div>
                                    <div>
                                        <Typography>Опрятность персонала</Typography>
                                        <RatingComponent value={neatness} max={5} onChange={setNeatness}/>
                                    </div>
                                </div>
                            </Condition>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Назад
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? "Завершить" : "Дальше"}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default withRouter(Rating);