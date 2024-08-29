'use client'

import { useEffect, useState } from 'react';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import Head from "next/head";

export default function Home() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/parsed_pdfs.json');
      const data = await response.json();
      setFlashcards(data);
    }

    fetchData();
  }, []);
  return (
    <Container>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create Flashcards from text" />
      </Head>

      <AppBar>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Button color="inherit" href="/">
              Flashcard SaaS
            </Button>
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{ textAlign: "center", my: 12 }}>
        <Typography variant="h2">Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5">
          The easiest way to create flashcards from text
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Get Started
        </Button>
      </Box>
      <Box sx={{ my: 4 }}>
        {flashcards.map((flashcard, index) => (
          <Card key={index} sx={{ maxWidth: 345, margin: 'auto', mb: 2 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {flashcard.file}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Form Instructions:</strong> {flashcard.formInstructions}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Box 1:</strong> {flashcard.box1}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Box 2:</strong> {flashcard.box2}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Box 3:</strong> {flashcard.box3}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Box 4:</strong> {flashcard.box4}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Box 5:</strong> {flashcard.box5}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Mail Instructions:</strong> {flashcard.mailInstructions}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Payment Voucher Info:</strong> {flashcard.paymentVoucherInfo}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>How To Fill Voucher:</strong> {flashcard.howToFillVoucher}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>How To Make Payment:</strong> {flashcard.howToMakePayment}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Payment Due Date:</strong> {flashcard.paymentDueDate}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

