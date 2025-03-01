import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import { motion, useAnimationControls } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostMoveButton({ direction, post, postType }) {
  const navigate = useNavigate();
  const divRef = useRef(null);
  const buttonRef = useRef(null);

  const [hover, setHover] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    if (hover) {
      let moveX = 0;
      if (direction === "left") {
        moveX = -10;
      } else {
        moveX = 10;
      }
      controls.start({
        x: [0, moveX, 0],
        transition: { duration: 1 },
      });
    }
  }, [controls, hover, direction]);

  function onClick(e, id) {
    navigate(`/blog/post/${id}?postType=${postType}`);
  }

  const button = (
    <>
      <motion.div ref={divRef} className="box" animate={controls}>
        {direction === "left" ? (
          <div className="post-left-arrow">
            <ArrowLeftOutlined />
          </div>
        ) : (
          <div className="post-right-arrow">
            <ArrowRightOutlined />
          </div>
        )}
      </motion.div>
    </>
  );
  return (
    <>
      <Button
        icon={button}
        ref={buttonRef}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        className={
          direction === "left"
            ? "post-button post-left-button"
            : "post-button post-right-button"
        }
        onClick={(e) => onClick(e, post.id)}
      >
        <Space
          direction="vertical"
          className={direction === "left" ? "post-left" : "post-right"}
        >
          <Typography.Text>
            {direction === "left" ? "이전" : "다음"} 포스트
          </Typography.Text>
          <Typography.Text>{post.postName}</Typography.Text>
        </Space>
      </Button>
    </>
  );
}
