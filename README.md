# Reviews

## Overview
This repository contains the Reviews microservice for the overall RFP53-Gimli backend service. 

## Description
**Endpoints** 

GET /reviews
* Returns a list of reviews for a given product
* Parameters
  * count - number of reviews to return, default 5
  * page - which page to start on, default 1
  * product_id - which product to select reviews from 
  * sort - how the database should be sorted, default helpfulness
  
GET /reviews/meta
* Returns the review meta data for a given product
* Parameters
  * product_id - which product to return meta data on


POST /reviews
* Creates a new review record in the database 
* Body
  * product_id - which product the review is for
  * rating - integer rating for the review
  * summary - a short string of what the reviewer thought of the product
  * body - a string that contains the main review
  * recommended - boolean represending if the reviewer recommended the product 
  * name - string of the reviewers name 
  * email - string of the reviewers email


PUT /reviews/:reviewid/helpfulness
* Adds to the helpfulness count
* Only parameter is the review id
* 

PUT /reviews/:reviewid/report
* Updates the reported column to true 
* Only parameter is the review id
