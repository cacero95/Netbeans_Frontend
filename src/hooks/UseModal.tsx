import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

interface ModalInterface {
    open: boolean,
    setOpen: () => void,
    component: any
}

export const UseModal = ( { open, setOpen, component }: ModalInterface ) => {

    const classes = useStyles();

    return (
        <Modal
            aria-labelledby = "transition-modal-title"
            aria-describedby = "transition-modal-description"
            className = { classes.modal }
            open = { open }
            onClose = { setOpen }
            closeAfterTransition
            BackdropComponent = { Backdrop }
            BackdropProps = {{
              timeout: 500,
            }}   
        >
            <Fade in = { open }>
                <div className = { classes.paper }>
                    { component }
                </div>
            </Fade>
        </Modal>
    )
}
