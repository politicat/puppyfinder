import url from 'url';
import request from 'request';

import adminController from '../admin/adminController';

import Puppy from '../puppy/puppyModel';
import puppyController from '../puppy/puppyController';

import searchController from '../search/searchController';

export default function (app, express) {
  // TODO single page로 합치기
  // 권한 인증하기
  // input validation
  // add.js <-> upload.html 파일명 통일하기
  app.get('/admin', adminController.getAdminPage);
  app.get('/dbmanage', adminController.getDbManagePage);
  app.get('/upload', adminController.getUploadPage);
  app.get('/update', adminController.getUpdatePage);
  app.get('/remove', adminController.getRemovePage);
  app.get('/stat', adminController.getStatPage);
  /*
   * SHOWS the result after admin user INSERTS puppy data via admin page
   * The reason POST is used is that we want to hide parameters at the end of url
   */
  app.post('/result', adminController.insertPuppy);

  app.get('/puppies', puppyController.getPuppies);
  app.get('/puppies/:breed', puppyController.getPuppiesByBreed);
  app.delete('/puppies/:breed', puppyController.deletePuppiesByBreed);
  app.put('/puppies/:id', puppyController.updatePuppy);

  // TODO query를 req.body로 보내기
  /* SEARCH and RETURN three matching puppies */
  app.get('/search', searchController.getResultPuppies);

  app.get('/daum', function(req, res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    // console.log(query);
    request({
      method: 'GET',
      url: encodeURI('https://apis.daum.net/search/image?apikey=0a82237676f6eb236ee760a0912ec05f&q='+query.q+'&result=20&output=json')
      // url: encodeURI('https://www.googleapis.com/customsearch/v1?q='+query.q +'&cx=007711437540587242288%3A1tx-m0h4ejq&imgType=photo&searchType=image&key=AIzaSyAIrtttKYKEIsLA1sdftk50R3xj3a5krvM')
    }, function(error, response, body){
      if(error){
        // console.log(error);
        res.send(404);
      } else {
      // console.log('BODY', body);
      res.send(body);
    }
    });
  });
}
