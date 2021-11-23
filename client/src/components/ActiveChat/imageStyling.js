import { makeStyles } from "@material-ui/core";

export const useImageStyles = makeStyles(theme => ({
  imagesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    
  },
  image: {
    minWidth: '100px',
    height: '100px',
    borderRadius: '10px'
  }
}))
