  
import express  from 'express';
import postRouter from './post.route'
import commentsRoute from './comments.route'

let router = express.Router();


/* GET APP Details. */
router.get('/', function(req, res, next) {
  let response = {
    app_name:'Social Medial API',
    developers : [{
      name: 'Lakith Muthugala',
      git_repo: 'https://github.com/lakith',
      linkdin: 'https://lk.linkedin.com/in/lakith-muthugala-150532125',
      twitter: 'https://twitter.com/MuthugalaLakith',
      facebook: 'https://www.facebook.com/senila.muthugala/'
    }],
  }
  res.status(200).send(response);
});

router.get('/status', (req, res) => { res.send({status: 'OK'}) }) // api status
router.get('/health', (req, res) => { res.send({status: 'OK'}) }) // api status

router.use('/post', postRouter); // post routes.
router.use('/comment', commentsRoute); // comments routes.

export default router;
