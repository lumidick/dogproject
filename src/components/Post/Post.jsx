import React from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Grid, Card, CardActions, CardHeader, CardMedia, CardContent, Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
}));

const Post = ({ image, author, title, created_at, text }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const formatDate = (date) => dayjs(date).locale('ru').format('dddd DD/MM/YYYY');

  return (
    <Grid container item xs={2} sm={4} md={3}>
      <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
        <CardHeader
          avatar={
            <Avatar src={author?.avatar} sx={{ bgcolor: red[500] }} aria-label="recipe">
              {author?.name[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={title}
          subheader={formatDate(created_at)}
        />
        <CardMedia component="img" height="194" image={image} alt={title} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Post:</Typography>
            <Typography paragraph>{text}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default Post;
