import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";

export const FileInput = (
  props: Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "onChange" | "id"
  > & {
    id: string;
    onChange: (fileContent: string) => void;
  }
) => {
  const [fileReader] = useState(new FileReader());

  const [fileContent, setFileContent] = useState<string>();

  useEffect(() => {
    if (fileContent === undefined) {
      return;
    }

    props.onChange(fileContent);
  }, [fileContent, props.onChange]);

  const readFile = useCallback(
    (file: File) => {
      fileReader.addEventListener(
        "load",
        () => {
          setFileContent(fileReader.result as string);
        },
        {
          once: true,
        }
      );

      fileReader.readAsText(file);
    },
    [fileReader]
  );

  const handleInputChangeEvent = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = (event.currentTarget.files ?? [])[0];

      try {
        if (!file) {
          throw new Error("missing file");
        }

        readFile(file);
      } catch (error) {
        console.error(error);

        //  display error notification
      }
    },
    [readFile]
  );

  return <input {...props} onChange={handleInputChangeEvent} type="file" />;
};
