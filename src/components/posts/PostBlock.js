import sanitizeHtml from "sanitize-html";

// Assets
import Quotes from "../../images/quotation-marks.svg";

const PostBlock = ({ block }) => {
  switch (block.type) {
    case "paragraph":
      return <Paragraph content={block.data.text} />;
    case "code":
      return <Code content={block.data.code} />;
    case "list":
      return <List content={block} />;
    case "linkTool":
      return <LinkTool link={block.data.link} />;
    case "header":
      return <Header txt={block.data.text} />;
    case "quote":
      return <Quote content={block} />;
    default:
      return <div></div>;
  }
};

const Paragraph = ({ content }) => {
  return (
    <>
      <p
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
        className="text-xl mb-9"
      />
    </>
  );
};

const Code = ({ content }) => {
  return (
    <>
      <div className="mb-9">
        <label className="font-light text-cornflower-blue text-sm">
          {"<code />"}
        </label>
        <code
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
          className="block bg-cloud-burst text-cranberry px-4 py-3 mt-2 whitespace-pre-line"
        />
      </div>
    </>
  );
};

const List = ({ content }) => {
  return (
    <>
      <ul
        className={`${
          content.data.style == "unordered" ? "list-disc" : "list-decimal"
        } ml-7 mb-9`}
      >
        {content.data.items.map((item) => (
          <li
            key={item}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(item) }}
          ></li>
        ))}
      </ul>
    </>
  );
};

const LinkTool = ({ link }) => {
  return (
    <a
      className="block underline text-cornflower-blue mb-9"
      href={link}
      target="_blank"
    >
      {link}
    </a>
  );
};

const Header = ({ txt }) => {
  return (
    <h4
      className="text-4xl font-bold mb-[20px]"
      dangerouslySetInnerHTML={{ __html: sanitizeHtml(txt) }}
    />
  );
};

const Quote = ({ content }) => {
  return (
    <div className="mb-9 relative flex items-center gap-3">
      <div className="rounded text-white bg-flamingo p-1">
        <Quotes className="fill-current" />
      </div>
      <div>
        <p className="capitalize text-base">{content.data.text}</p>
        <div className="text-right font-light text-cranberry text-sm">
          <span className="inline-block w-4 h-[2px] bg-cranberry align-middle mr-2"></span>
          {content.data.caption}
        </div>
      </div>
    </div>
  );
};
export default PostBlock;
