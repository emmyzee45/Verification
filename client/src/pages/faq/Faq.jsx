import "./faq.css";
import React, { useState } from "react";
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Footer from "../../components/footer/Footer";
// import { CollectorsData } from "../../data";



function Faq() {
    const [expanded, setExpanded] = useState(false);
    const [expanded2, setExpanded2] = useState(false);
    const [expanded3, setExpanded3] = useState(false);
    const [expanded4, setExpanded4] = useState(false);
    const [expanded5, setExpanded5] = useState(false);
    const [expanded6, setExpanded6] = useState(false);
    const [expanded7, setExpanded7] = useState(false);
    const [expanded8, setExpanded8] = useState(false);
    const [expanded9, setExpanded9] = useState(false);
   
    const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };
  const handleExpandClick3 = () => {
    setExpanded3(!expanded3);
  };
  const handleExpandClick4 = () => {
    setExpanded4(!expanded4);
  };
  const handleExpandClick5 = () => {
    setExpanded5(!expanded5);
  };
  const handleExpandClick6 = () => {
    setExpanded6(!expanded6);
  };
  const handleExpandClick7 = () => {
    setExpanded7(!expanded7);
  };
  const handleExpandClick8 = () => {
    setExpanded8(!expanded8);
  };
  const handleExpandClick9 = () => {
    setExpanded9(!expanded9);
  };
  
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    // marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
}));

const CollectorsData = [
  
    {
   
  title: "How long do subscriptions last?",
  description: "They can last as long as you want to keep the number! If you know you just need a number for a little while, you can instead buy a temporary number.",
  ref: "q1",
  handleClick: handleExpandClick,
  expanded: expanded,
  href:"/about",
  link:"here"
  },
  {
    title: "What is the max subscription lifetime?",
    description: "There is no maximum for permanent subscriptions. There is a maximum lifetime for temporary numbers, but this is different for different numbers. Before completing a purchase, you will be able to see what the maximum lifetime will be.",
    ref: "q2",
    handleClick: handleExpandClick2,
    expanded: expanded2,
    href:"",
    link:"",
  },
  
  {
    title: "How much does a subscription cost?",
  description: "Multipurpose lines are available for $45 a month. A subscription for a single service is available starting at $13.50 a month.",
  ref: "q3",
  handleClick: handleExpandClick3,
  expanded: expanded3,
  href:"",
  link:"",
  },
  {
    title: "How do I get a subscription?",
    description: "Start one through the Buy Subscriptions page or use our mobile app.",
    ref: "q4",
    handleClick: handleExpandClick4,
    expanded: expanded4,


    href:"",
    link:"",
  },
  {
    title: "How do I modify/cancel my subscription?",
    description: "You can manage it through our mobile app or website.",
    ref: "q5",
    handleClick: handleExpandClick5,
    expanded: expanded5,


    href:"",
    link:"",
  },
  {
  title: "Where can I see my purchase transactions?",
  description: "You can look at your order history through our mobile app. This will soon be available on our website as well.",
  ref: "q6",
  handleClick: handleExpandClick6,
  expanded: expanded6,

  href:"",
  link:"",
  }
  ,
  {
    title: "What forms of payment do you accept?",
    description: "We accept Bitcoin, Litecoin, and major credit cards.",
    ref: "q7",
    handleClick: handleExpandClick7,
    expanded: expanded7,


    href:"",
    link:"",
  }
  ,
  {
    title: "My payment went through, but I didn’t get my balance updated! What do I do?",
    description: "Please contact support with your account email and order number. For Bitcoin payments, we require sufficient network confirmations before automatically crediting your account. Other cryptocurrencies will be processed whenever we are notified by our payment processor. This will vary based on the required number of confirmations and the network's confirmation speed. If you are paying with a cryptocurrency, please make sure you are including any transaction fees your wallet deducts in your total payment amount. We are not liable for any payments sent to the wrong party or wrong wallet.",
    ref: "q8",
    handleClick: handleExpandClick8,
    expanded: expanded8,


    href:"",
    link:"",
  }
  ,
  {
    title: "I want a monetary refund. What do I do?",
    description: "Please contact support (link is in the bottom right of the page) with your account email and reason for refund. We assess credit/monetary refunds on a case by case basis and will work with you to make it right. Please note that we can only refund to the original form of payment, and are unable to process cryptocurrency refunds.",
    ref: "q9",
    handleClick: handleExpandClick9,
    expanded: expanded9,


    href:"",
    link:"",
  }
]   

    const displayQuestions = CollectorsData.map((question, index) => {
        return ( 
            <Box className='font-Montserrat' key={index} onClick={question.handleClick} sx={{ width:{xl: '1242px',lg: '950px', md: '850px', sm:'590px',xs:'320px'}, height:'full', display: 'flex',
            flexDirection: 'row', justifyContent:'center'}}>
          <Card key={index} sx={{ border:1, borderColor:"#6E028F" , background:question.expanded ? 'rgba(255,255,255,.08)' : 'transparent',  boxShadow: 0, marginY:'10px',}}>
          <ExpandMore
            key={index}
            expand={question.expanded}
            onClick={question.handleClick}
            aria-expanded={question.expanded}
            aria-label="show more"
          >
             
              
        <CardContent sx={{ width:{xl: '1192px', lg: '900px', md: '800px',sm:'540px', xs:'270px'}, display: 'flex',
            flexDirection: 'row', justifyContent:'space-between'}}>
        <p className="text-base text-white font-semibold md:text-xl text-md text-left" style={{ color: "black"}}>{question.title}</p>
          
        </CardContent>
    
        <CardActions disableSpacing    sx={{m:'auto', width:'20px', marginRight:'10px'}}>
         {question.expanded?   <RemoveIcon sx={{ color: 'black', m:'auto'  }}/>:  <AddIcon sx={{ color: 'black', m:'auto'  }}/>}
           
          
         
          {/* <p className="text-base text-white font-semibold">
            See More
          </p> */}
        </CardActions>
      
        
        </ExpandMore> 
        <Collapse in={question.expanded} timeout="auto" unmountOnExit>
       
          <CardContent sx={{width:{xl: '1168px', lg: '900px', md: '800px',sm:'540px', xs:'310px'}}} className='relative bottom-2.5'>
       
          <p className="text-base text-white ml-2" style={{color: "black"}}> {question.description} </p>
    
         
          </CardContent>
         
        </Collapse>
      </Card>
      </Box>
        );
      })

  return (
  <div>
    <div className='faqContainer'>
      <h1 className="faq-title">FAQ</h1>
      {/* <div className="question-container">
        <div className="question-item">first</div>
        <div className="answer-item">answer</div>
      </div>
      <div className="question-container">
        <div className="question-item">second</div>
        <div className="answer-item">answer</div>
      </div> */}
      <div style={{marginBottom: "50px"}} >
        {displayQuestions}
      </div>
    </div>
      <Footer />
      </div>
  );
}

export default Faq;
