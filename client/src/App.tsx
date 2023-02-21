import {
  DocumentScanner,
  Download,
  GitHub,
  Help,
  Search,
  Upload,
} from "@mui/icons-material";
import {
  Autocomplete,
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  IconButtonProps,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { saveAs } from "file-saver";
import React, {
  ChangeEvent,
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { v4 as createUuid } from "uuid";
import "./App.css";
import { ReactComponent as Illustration } from "./illustration.svg";

const Title = () => {
  return (
    <Typography
      variant="h4"
      fontFamily="Modak"
      py={4}
      color="primary"
      sx={{ userSelect: "none" }}
    >
      🐚 shelfi.sh
    </Typography>
  );
};

const Footer = () => {
  return (
    <Stack direction="row" justifyContent="end" py={1}>
      <Link href="https://github.com/benrosen/shelfi.sh" target="_blank">
        <GitHub />
      </Link>
    </Stack>
  );
};

const DownloadButton = (props: IconButtonProps) => {
  const [books] = useBookshelfContext();

  const downloadBookshelfAsJson = useCallback(() => {
    const serializedBooks = JSON.stringify(books, null, 2);

    const blob = new Blob([serializedBooks], { type: "application/json" });

    saveAs(blob, "bookshelf.json");
  }, [books]);

  return (
    <IconButton onClick={downloadBookshelfAsJson} {...props}>
      <Download />
    </IconButton>
  );
};

const UploadButton = (props: IconButtonProps) => {
  const [, setBooks] = useBookshelfContext();

  const fileInputId = createUuid();

  const [fileReader] = useState(new FileReader());

  const [file, setFile] = useState<string>();

  useEffect(() => {
    if (!file) {
      return;
    }

    const bookshelf = JSON.parse(file);

    if (!isBookshelf(bookshelf)) {
      //  display error notification
      console.error("not a valid bookshelf");
    } else {
      setBooks(bookshelf);
    }
  }, [file, setBooks]);

  const readFile = useCallback(
    (file: File) => {
      fileReader.addEventListener(
        "load",
        () => {
          setFile(fileReader.result as string);
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

  return (
    <label htmlFor={fileInputId}>
      <input
        accept="application/JSON"
        type="file"
        id={fileInputId}
        hidden
        onChange={handleInputChangeEvent}
      />
      <IconButton {...props} component="span">
        <Upload />
      </IconButton>
    </label>
  );
};

const HelpButton = (props: IconButtonProps) => {
  return (
    <IconButton {...props} component="span">
      <Help />
    </IconButton>
  );
};

const Menu = () => {
  const theme = useTheme();
  const isNarrow = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack direction={"row"} spacing={2} justifyContent="end">
      <UploadButton />
      <DownloadButton />
      <IconButton>
        <DocumentScanner />
      </IconButton>
      <HelpButton />
    </Stack>
  );
};

const SearchBar = () => {
  const [books] = useBookshelfContext();

  const options = useMemo<Searchable[]>(() => {
    return books.flatMap((book) => {
      return book.indexEntries.map((indexEntry) => {
        return {
          authors: book.authors,
          title: book.title,
          ...indexEntry,
        };
      });
    });
  }, [books]);

  return (
    <Autocomplete
      freeSolo
      fullWidth
      autoHighlight
      disableCloseOnSelect
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            label="Search your bookshelf"
          />
        );
      }}
      groupBy={(option) => {
        return option.title as string;
      }}
      options={options}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.label, inputValue, { insideWords: true });
        const parts = parse(option.label, matches);

        return (
          <li {...props}>
            <Stack width="100%" direction="row" justifyContent="space-between">
              <Typography>
                {parts.map((part, index) => {
                  return (
                    <span
                      key={index}
                      style={{ fontWeight: part.highlight ? 700 : 400 }}
                    >
                      {part.text}
                    </span>
                  );
                })}
              </Typography>
              <Typography>{option.pages.join(", ")}</Typography>
            </Stack>
          </li>
        );
      }}
      PaperComponent={(props) => {
        return <Paper elevation={24} sx={{ mt: 1 }} {...props} />;
      }}
    />
  );
};

type Bookshelf = Book[];

const isBookshelf = (value: unknown): value is Bookshelf => {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every(isBook);
};

interface Book extends Record<string, JsonSerializable> {
  authors: string[];
  title: string;
  indexEntries: IndexEntry[];
}

const isBook = (value: unknown): value is Book => {
  const maybeBook = value as Book;

  if (typeof (maybeBook.title as unknown) !== "string") {
    return false;
  }

  if (!Array.isArray(maybeBook.authors)) {
    return false;
  }

  if (
    !maybeBook.authors.every((author: unknown) => {
      return typeof author === "string";
    })
  ) {
    return false;
  }

  return maybeBook.indexEntries.every(isIndexEntry);
};

interface IndexEntry extends Record<string, JsonSerializable> {
  label: string;
  pages: string[];
}

const isIndexEntry = (value: unknown): value is IndexEntry => {
  const maybeIndexEntry = value as IndexEntry;

  if (typeof (maybeIndexEntry.label as unknown) !== "string") {
    return false;
  }

  if (!Array.isArray(maybeIndexEntry.pages)) {
    return false;
  }

  return maybeIndexEntry.pages.every((page: unknown) => {
    return typeof page === "string";
  });
};

type JsonSerializable =
  | string
  | boolean
  | number
  | null
  | JsonSerializable[]
  | { [key: string]: JsonSerializable };

interface Searchable extends IndexEntry, Omit<Book, "indexEntries"> {}

const BookshelfContext = createContext([[], () => {}] as [
  Bookshelf,
  Dispatch<SetStateAction<Bookshelf>>
]);

const useBookshelfContext = () => {
  return useContext(BookshelfContext);
};

function App() {
  const localStorageKey = "bookshelf";

  const [bookshelf, setBookshelf] = useState<Bookshelf>(
    JSON.parse(localStorage.getItem(localStorageKey) ?? "[]")
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(bookshelf));
  }, [bookshelf]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BookshelfContext.Provider value={[bookshelf, setBookshelf]}>
        <Stack direction="column" height="100vh">
          <Container maxWidth="sm" sx={{ flexGrow: 1 }}>
            <Stack direction="column" height="100%">
              <Title />
              <Stack
                direction="column"
                py={2}
                spacing={2}
                flexGrow={1}
                justifyContent="center"
              >
                <Paper elevation={8} sx={{ p: 4, borderRadius: 2 }}>
                  <Stack spacing={1}>
                    <SearchBar />
                    <Menu />
                  </Stack>
                </Paper>
              </Stack>
            </Stack>
          </Container>
          <Container maxWidth="xl">
            <Footer />
          </Container>
        </Stack>
      </BookshelfContext.Provider>
      <Illustration
        style={{
          position: "fixed",
          maxHeight: "100vh",
          bottom: "-35vh",
          left: "-70vh",
          zIndex: -1,
          opacity: 0.25,
        }}
        fill={theme.palette.primary.main}
      />
    </ThemeProvider>
  );
}

export default App;
