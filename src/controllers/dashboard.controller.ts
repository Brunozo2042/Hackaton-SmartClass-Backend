import express from 'express';
import supabase from '../db/supabase';

export async function getAdminDashboardData(req: express.Request, res: express.Response) {
  try {
    const alunosCount = await supabase.from('alunos').select('*', { count: 'exact', head: true });
    const professoresCount = await supabase
      .from('professores')
      .select('*', { count: 'exact', head: true });
    const turmasCount = await supabase.from('turmas').select('*', { count: 'exact', head: true });
    const conteudosCount = await supabase
      .from('conteudos')
      .select('*', { count: 'exact', head: true });

    const nextEventos = await supabase
      .from('eventos')
      .select('*')
      .order('data', { ascending: true })
      .limit(5)
      .gt('data', new Date().toISOString());

    const dashboardData = {
      totalAlunos: alunosCount.count,
      totalProfessores: professoresCount.count,
      totalTurmas: turmasCount.count,
      totalConteudos: conteudosCount.count,
      proximosEventos: nextEventos.data,
    };

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados do dashboard' });
  }
}

export async function getProfessorDashboardData(req: express.Request, res: express.Response) {
  try {
    const professorId = req.params.id;
    const { count: turmasCount, error: turmasError } = await supabase
      .from('professor_turmas')
      .select('*', { count: 'exact', head: true })
      .eq('professor_id', professorId);
    const { count: conteudosCount, error: conteudosError } = await supabase
      .from('conteudos')
      .select('*', { count: 'exact', head: true })
      .eq('professor_id', professorId);

    const nextEventos = await supabase
      .from('eventos')
      .select('*')
      .order('data', { ascending: true })
      .limit(5)
      .gt('data', new Date().toISOString());

    const dashboardData = {
      totalTurmas: turmasCount,
      totalConteudos: conteudosCount,
      proximosEventos: nextEventos.data,
    };

    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar dados do dashboard' });
  }
}
