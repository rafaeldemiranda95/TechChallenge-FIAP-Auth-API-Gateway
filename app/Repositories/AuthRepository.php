<?php 
// app/Repositories/AuthRepository.php

namespace App\Repositories;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth;
use Kreait\Firebase\Firestore;
use Log;

class AuthRepository
{
    protected $firebaseAuth;
    protected $firestore;

    public function __construct()
    {
        $firebase = (new Factory)->withServiceAccount(base_path(env('FIREBASE_CREDENTIALS')));
        $this->firebaseAuth = $firebase->createAuth();
        $this->firestore = $firebase->createFirestore()->database();
    }

    public function createUser(array $data)
    {
        Log::info("Iniciando processo de criação de usuário");
        $userProperties = [
            'email' => $data['email'],
            'password' => $data['password'],
        ];
        $user = $this->firebaseAuth->createUser($userProperties);

        $this->firestore->collection('usuarios')->document($user->uid)->set([
            'email' => $data['email'],
        ]);
        Log::info("Usuário criado com sucesso: " . $user->uid);


        return $user;
    }
}
