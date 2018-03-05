import React from 'react';
import Button from 'material-ui/Button';
const FollowButton=({isSubscribe,cancelSubscribe,onSubscribe,data,...other})=>{
  const btnStr=isSubscribe?'不再关注':'关注';
  return <Button 
      variant="raised"  
      color={isSubscribe?"default":"secondary"}
      {...other}
      onClick={()=>{
        if(isSubscribe){
          cancelSubscribe(data)
        }else{
          onSubscribe(data)
        }
      }} >
      {btnStr}
    </Button>
}
export default FollowButton