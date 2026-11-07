import React from "react";
import {
  Globe,
  BookOpen,
  FileText,
  Coffee,
  Sparkles,
  ExternalLink,
  FolderGit2,
  Code,
  Layers,
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface LinkIconProps {
  name?: string;
  className?: string;
}

export function DynamicLinkIcon({ name, className = "w-5 h-5" }: LinkIconProps) {
  switch (name?.toLowerCase()) {
    case "globe":
      return <Globe className={className} />;
    case "book-open":
      return <BookOpen className={className} />;
    case "file-text":
      return <FileText className={className} />;
    case "github":
      return <GithubIcon className={className} />;
    case "coffee":
      return <Coffee className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "folder":
    case "project":
      return <FolderGit2 className={className} />;
    case "code":
      return <Code className={className} />;
    case "layers":
      return <Layers className={className} />;
    default:
      return <ExternalLink className={className} />;
  }
}
