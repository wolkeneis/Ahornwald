import { InferProps } from "prop-types";
import { forwardRef, Ref } from "react";
import { Link as RouterLink } from "react-router-dom";

const LinkBehavior = forwardRef(({ href, ...other }: InferProps<{ href: string }>, ref: Ref<HTMLAnchorElement>) => {
  return <RouterLink ref={ref} to={href} {...other} />;
});

LinkBehavior.displayName = "LinkBehavior";

export default LinkBehavior;
