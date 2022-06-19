import React from "react";
import { motion } from "framer-motion"
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
  } from "react-share";
       

export default function SocialMediaButtons(props) {
       return (
              <div>
                     <motion.button
                            whileHover={{
                            scale: 1.2,
                            transition: { duration: .2 },
                            }}

                     >
                            <FacebookShareButton 
                                   url={props.url}
                                   quote={props.quote}
                                   hashtag={props.hashtag}>
                            <FacebookIcon size={75} />
                            </FacebookShareButton>
                     </motion.button>

                    <motion.button
                            whileHover={{
                            scale: 1.2,
                            transition: { duration: .2 },
                            }}

                     >
                            <TwitterShareButton 
                                   url={props.url}
                                   quote={props.quote}
                                   hashtag={props.hashtag}>
                            <TwitterIcon size={75} />
                            </TwitterShareButton>
                     </motion.button>

                     <motion.button
                            whileHover={{
                            scale: 1.2,
                            transition: { duration: .2 },
                            }}

                     >
                            <PinterestShareButton 
                                   url={props.url}
                                   media={props.url}>
                            <PinterestIcon size={75} />
                            </PinterestShareButton>
                     </motion.button>

                     <motion.button
                            whileHover={{
                            scale: 1.2,
                            transition: { duration: .2 },
                            }}

                     >
                            <EmailShareButton 
                                   url={props.url}
                                   quote={props.quote}
                                   hashtag={props.hashtag}>
                            <EmailIcon size={75} />
                            </EmailShareButton>
                     </motion.button>

                     <motion.button
                            whileHover={{
                            scale: 1.2,
                            transition: { duration: .2 },
                            }}

                     >
                            <WhatsappShareButton 
                                   url={props.url}
                                   quote={props.quote}
                                   hashtag={props.hashtag}>
                            <WhatsappIcon size={75} />
                            </WhatsappShareButton>
                     </motion.button>
            </div>
       );
}